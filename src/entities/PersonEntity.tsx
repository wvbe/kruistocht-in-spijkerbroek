import { FunctionComponent, useCallback, useState } from 'react';
import { Path } from '../classes/Path';
import { TerrainCoordinate } from '../classes/TerrainCoordinate';
import { getRandomFemaleFirstName, getRandomMaleFirstName } from '../constants/names';
import { MovingAnchor } from '../space/Anchor';
import { Event, useEventListeners } from '../util/events';
import { Entity } from './Entity';

type OnEntityClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => void;
export class PersonEntity extends Entity {
	// The event that the person starts walking a path
	public readonly pathStart = new Event<[]>();
	// The event that the person finishes a path, according to react-spring's timing
	public readonly pathEnd = new Event<[]>();
	// The person started one step
	public readonly pathStepStart = new Event<[TerrainCoordinate]>();
	// The person started finished one step, according to react-spring's timing
	public readonly pathStepEnd = new Event<[TerrainCoordinate]>();

	protected passport: { firstName: string };

	constructor(id: string, location: TerrainCoordinate) {
		super(id, location);

		// Movement handling
		this.pathStepEnd.on((loc) => {
			this.location = loc;
		});

		const feminine = Math.random() < 0.5;
		this.passport = {
			firstName: feminine ? getRandomFemaleFirstName() : getRandomMaleFirstName()
		};
	}

	// Calculate a path and emit animations to walk it the whole way. `this.location` is updated in between each step
	public walkTo(destination: TerrainCoordinate) {
		if (!this.location.terrain) {
			throw new Error(`Entity "${this.id}" is trying to path in a detached coordinate`);
		}
		const path = new Path(this.location.terrain, { closest: true }).find(
			this.location,
			destination
		);
		if (!path.length) {
			return;
		}
		let unlisten = this.pathStepEnd.on(() => {
			const nextStep = path.shift();

			if (!nextStep) {
				unlisten();
				this.pathEnd.emit();
			} else {
				this.doPathStep(nextStep);
			}
		});

		this.doPathStep(path.shift() as TerrainCoordinate);
	}
	/**
	 * Move entity directly to a coordinate. Does not consider accessibility or closeness.
	 */
	public doPathStep(coordinate: TerrainCoordinate) {
		if (coordinate.hasNaN()) {
			debugger;
		}
		this.pathStepStart.emit(coordinate);
	}

	get label(): string {
		return this.passport.firstName;
	}

	Component: FunctionComponent = () => {
		return <circle cx={0} cy={0} r="5" fill="white" />;
	};
}
/**
 * A component that automatically transitions the entity component as per its move instructions
 */
export const PersonEntityComponent: FunctionComponent<{
	entity: PersonEntity;
	onClick?: OnEntityClick;
}> = ({ entity, onClick }) => {
	const [{ destination, duration }, animatePosition] = useState({
		destination: entity.location,
		duration: 0
	});

	useEventListeners(
		() => [
			// Listen for the entity moveStart order;
			entity.pathStepStart.on((destination) =>
				animatePosition({
					destination,
					duration: entity.location.euclideanDistanceTo(destination) * 500
				})
			)
		],
		[entity.pathStepStart]
	);

	const onRest = useCallback(
		() => entity.pathStepEnd.emit(destination),
		[entity.pathStepEnd, destination]
	);

	return (
		<MovingAnchor moveTo={destination} moveSpeed={duration} onRest={onRest} onClick={onClick}>
			<entity.Component />
		</MovingAnchor>
	);
};
