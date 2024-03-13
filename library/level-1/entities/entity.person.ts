import { BehaviorTreeSignal } from '../behavior/BehaviorTreeSignal.ts';
import { EntityBlackboard, type BehaviorTreeNodeI } from '../behavior/types.ts';
import { Event } from '../events/Event.ts';
import { EventedValue, type SaveEventedValueJson } from '../events/EventedValue.ts';
import { Path } from '../classes/Path.ts';
import { PERSON_NEEDS, PersonNeedId } from '../constants/needs.ts';
import { Inventory, type SaveInventoryJson } from '../inventory/Inventory.ts';
import { SaveJsonContext } from '../types-savedgame.ts';
import { type CallbackFn, type CoordinateI, type SimpleCoordinate, type TileI } from '../types.ts';
import { Entity, type SaveEntityJson } from './entity.ts';
import { Need, type SaveNeedJson } from './Need.ts';
import * as behaviorTree from '../systems/behaviorTree.ts';
import { ProgressingNumericValue } from '../events/ProgressingNumericValue.ts';

export type PersonEntityPassportOptions = {
	gender: 'm' | 'f';
	firstName: string;
};

type PersonEntityNeedOptions = {
	needs: Partial<Record<PersonNeedId, number>>;
};

export type PersonEntityBehavior = BehaviorTreeNodeI<EntityBlackboard> | null;

export type SavePersonEntityJson = SaveEntityJson & {
	passport: PersonEntityPassportOptions;
	needs: SaveNeedJson[];
	behavior: SaveEventedValueJson;
	wallet: SaveEventedValueJson;
	inventory: SaveInventoryJson;
};

export class PersonEntity extends Entity {
	// The amount of game coordinate per millisecond
	private readonly walkSpeed = 1 / 1000;

	/**
	 * Event: The user started a new path towards another destination.
	 */
	public readonly $pathStart = new Event<[]>(`${this.constructor.name} $pathStart`);

	/**
	 * Event: The event that the person finishes every step of a path.
	 *
	 * @TODO maybe invent a more generic "idle" event.
	 */
	public readonly $pathEnd = new Event<[]>(`${this.constructor.name} $pathEnd`);

	/**
	 * Event: The person started one step.
	 */
	public readonly $stepStart = new Event<
		[
			/**
			 * The destination of this step
			 */
			CoordinateI,
			/**
			 * The expected duration of time it takes to perform this step
			 */
			number,
			/**
			 * The "done" callback. Call this when the driver animation/timeout ends, so that
			 * the next event is safely emitted.
			 */
			CallbackFn,
		]
	>(`${this.constructor.name} $stepStart`);

	/**
	 * Event: The person started finished one step. The entities location is updated upon this event.
	 *
	 * Do not emit this event. Instead, call the "done()" argument of the $stepStart event. For
	 * example:
	 *
	 *   entity.$stepStart.on((destination, duration, done) => {
	 *      // Entity starts stepping towards ${destination}
	 *      game.time.setTimeout(done, duration);
	 *   });
	 */
	public readonly $stepEnd = new Event<[CoordinateI]>(`${this.constructor.name} $stepEnd`);

	/**
	 * The behavior tree root node for this entity. Calling `.evaluate()` on it will return a
	 * promise of whatever it is that this entity should be doing.
	 */
	public readonly $behavior = new EventedValue<PersonEntityBehavior | null>(
		null,
		`${this.constructor.name} $behavior`,
		{
			fromJson: async (context, id) => context.behaviorNodes.itemFromSaveJson(id as string),
			toJson: (context, node) => context.behaviorNodes.itemToSaveJson(node),
		},
	);

	public readonly $health = new ProgressingNumericValue(
		1,
		{ delta: 0, granularity: 0.01, min: 0, max: 1 },
		'health',
	);
	/**
	 * The kind of information that would show up in a passport -- but since this is a perfect world,
	 * there is no discrimination based on this to speak of :)
	 */
	public readonly passport: {
		gender: 'm' | 'f';
		firstName: string;
	};

	/**
	 * The stuff this person carries around. As it happens that also makes them the (temporary)
	 * owner of it.
	 */
	public readonly inventory = new Inventory(6);

	/**
	 * The amount of money this person posesses.
	 */
	public readonly wallet = new EventedValue<number>(0, `${this.constructor.name} wallet`);

	public readonly needs = PERSON_NEEDS.map(
		(config) => new Need(config.id, 1, config.label, config.decay),
	);

	public type = 'person' as const;

	constructor(
		id: string,
		location: SimpleCoordinate,
		options: PersonEntityPassportOptions & Partial<PersonEntityNeedOptions>,
	) {
		super(id, location);

		const { needs, ...passport } = options;
		this.passport = passport;

		// Movement handling
		this.$stepEnd.on(async (loc) => {
			await this.$$location.set(loc);
		});

		for (const need of this.needs) {
			need.set(needs?.[need.id] || 1, true);
		}
		// Register need into game event loop
		this.$attach.on(async (game) => {
			for (const need of this.needs) {
				this.$detach.once(() => need.detach());
				await need.attach(game);
			}
			// @TODO necessary?
			// this.$detach.once(() => this.needs.forEach((need) => need.clear()));
		});
	}

	public get name(): string {
		return this.passport.firstName;
	}

	public get icon(): string {
		return this.passport.gender === 'm' ? '👨' : '👩';
	}

	/**
	 * Make the entity choose a path from its current location to the destination, and start an
	 * animation.
	 *
	 * Returns a promise that resolves when the path is completed, or rejects when another path
	 * interrupts our current before the destination was reached.
	 */
	public async walkToTile(destination: TileI): Promise<void> {
		const terrain = destination.terrain;
		if (!terrain) {
			throw new Error(`Entity "${this.id}" is trying to path to a detached coordinate`);
		}

		// Its _possible_ that an entity lives on a tile that has so much elevation that
		// .getTileClosestToXy actually finds the _wrong_ tile -- because its neighbor is closer than
		// the proximity to z=0. In that case, there is a bug:
		//
		// const start = terrain.getTileClosestToXy(this.$$location.get().x, this.$$location.get().y);
		//
		// To work around the bug, and as a cheaper option, find the tile whose XY is equal to the current
		// location. The only downsize is that entities that are mid-way a tile will not find one. Since
		// this is not a feature yet, we can use it regardless:
		const start = terrain.getTileEqualToLocation(this.$$location.get());
		const path = new Path(terrain, { closest: true }).findPathBetween(start, destination);
		await this.walkAlongPath(path);
	}

	/**
	 * Start the animation of walking a path. Return a promise that resolves when finished, or rejects
	 * when interrupted.
	 *
	 * Very similar to .walkToTile, but more appropriate if the path is already computed.
	 *
	 * @note Appears to have some duplicate code, this may need to be revised
	 */
	public async walkAlongPath(path: TileI[]): Promise<void> {
		// @TODO add some safety checks on the path maybe.
		// Emitting this event may prompt the promises of other walkOnTile tasks to reject.
		const nextTileInPath = path.shift();
		if (!nextTileInPath) {
			return;
		}

		await this.$pathStart.emit();

		const unlisten = this.$stepEnd.on(async () => {
			const nextStep = path.shift();
			if (!nextStep) {
				unlisten();
				unlistenNewPath();
				await this.$pathEnd.emit();
			} else {
				await this.#animateTo(nextStep);
			}
		});

		// If another .walkAlongPath call interrupts us, stop listening for our own $stepEnd events.
		// @TODO this is untested
		const unlistenNewPath = this.$pathStart.once(() => {
			unlisten();
		});

		const promise = new Promise<void>((resolve, reject) => {
			const stopListeningForFinish = this.$pathEnd.once(() => {
				stopListeningForInterrupt();
				resolve();
			});
			const stopListeningForInterrupt = this.$pathStart.once(() => {
				stopListeningForFinish();
				reject();
			});
		});

		// Take the first step to kick off this event chain;
		await this.#animateTo(nextTileInPath);

		return promise;
	}

	/**
	 * Move entity directly to a coordinate. Does not consider accessibility or closeness.
	 */
	async #animateTo(coordinate: CoordinateI) {
		if (coordinate.hasNaN()) {
			// @TODO remove at some point?
			throw new Error('This should never happen I suppose');
		}
		const done = async () => await this.$stepEnd.emit(coordinate);
		await this.$stepStart.emit(coordinate, this.distanceTo(coordinate) / this.walkSpeed, done);
	}

	public toSaveJson(context: SaveJsonContext): SavePersonEntityJson {
		return {
			...super.toSaveJson(context),
			passport: this.passport,
			needs: this.needs.map((need) => need.toSaveJson(context)),
			behavior: this.$behavior.toSaveJson(context),
			inventory: this.inventory.toSaveJson(context),
			wallet: this.wallet.toSaveJson(context),
		};
	}

	public static async fromSaveJson(
		context: SaveJsonContext,
		save: SavePersonEntityJson,
	): Promise<PersonEntity> {
		const { id, location, passport, needs, behavior, inventory, wallet, status } = save;
		const inst = new PersonEntity(id, location, passport);
		// @TODO restore needs from save JSON
		await inst.$behavior.overwriteFromSaveJson(context, behavior);
		await inst.$status.overwriteFromSaveJson(context, status);
		await inst.inventory.overwriteFromSaveJson(context, inventory);
		await inst.wallet.overwriteFromSaveJson(context, wallet);
		return inst;
	}
}
