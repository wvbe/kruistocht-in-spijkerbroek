import { Random } from '../classes/Random.ts';
import Game from '../Game.ts';
import { type JobI } from './types.ts';
import { Job } from './Job.ts';
import { type DestroyerFn } from '../types.ts';

export class LoiterJob extends Job implements JobI {
	private readonly destroyers: DestroyerFn[] = [];

	// The minimum and maximum amounts of ms before considering to move again, after having walked
	private walkMinWait = 4000;
	private walkMaxWait = 15000;

	// Every time that the entity might make a move, there's a good chance that they'll change their
	//   mind and lazy out instead.
	private walkChanceOnRoll = 0.3;

	// If the entity chooses to walk, its no more than this amount of times
	private walkMaxDistance = 3;

	get label() {
		return `Wandering around aimlessly…`;
	}
	public start(game: Game) {
		super.start(game);
		let steps = 0;
		let clearTimer: DestroyerFn | null = null;
		const doTimeout = () => {
			if (clearTimer) {
				throw new Error('Timer for LoiterJob already exists');
			}
			clearTimer = game.time.setTimeout(() => {
				clearTimer = null;
				if (Random.boolean([this.entity.id, 'strp', steps], this.walkChanceOnRoll)) {
					doTimeout();
					return;
				}
				steps++;
				const destinations =
					game.terrain.selectClosestTiles(this.entity.$$location.get(), this.walkMaxDistance) || [];
				this.entity.walkToTile(
					Random.fromArray(destinations, this.entity.id, 'roam-destination', steps),
				);
			}, this.walkMinWait + Random.float(this.entity.id, 'roam-delay', steps) * (this.walkMaxWait - this.walkMinWait));
		};

		this.destroyers.push(this.entity.$pathEnd.on(doTimeout));
		this.destroyers.push(() => {
			if (clearTimer) {
				clearTimer();
			}
		});

		doTimeout();
	}

	destroy() {
		super.destroy();
		this.destroyers.forEach((destroy) => destroy());
	}
}
