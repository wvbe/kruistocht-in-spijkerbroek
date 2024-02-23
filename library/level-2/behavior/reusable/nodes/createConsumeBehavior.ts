import {
	BehaviorError,
	EntityBlackboard,
	ExecutionNode,
	InverterNode,
	MarketBuildingEntity,
	Material,
	PersonNeedId,
	SelectorNode,
	SequenceNode,
	type Inventory,
	type MaterialState,
} from '@lib/core';
import { createBuyFromMarketBehavior } from './createBuyFromMarketBehavior.ts';
import { createWaitBehavior } from './createWaitBehavior.ts';
import { getMostDesirableItem } from '../primitives/getMostDesirableItem.ts';
import { DesirabilityScoreFn } from '../primitives/getMostDesirableItem.ts';
import { DesirabilityRecord } from '../primitives/getMostDesirableItem.ts';

type ConsumptionType = {
	/**
	 * A function that selects the candidate materials to be bought/consumed.
	 */
	materialFilter(state: MaterialState): boolean;
	/**
	 * A function that, from all the candidate materials, selects the one that is most desirable.
	 */
	materialDesirabilityScore: DesirabilityScoreFn;
	/**
	 * A function that generates a status for the moment that the entity gets to satisfying their need.
	 */
	statusFormatter(material: Material): string;
	/**
	 * ID of the need that is being fulfilled
	 */
	fulfilledNeedId: PersonNeedId;
	/**
	 * ID of the property of the material that determines how much of the need can be fulfilled per
	 * item that is consumed.
	 */
	fulfillingMaterialProperty: keyof Material;
};

/**
 * A behavior tree for eating any food available from inventory, or to go buy food.
 */
export function createConsumeBehavior(config: ConsumptionType) {
	return new SequenceNode<EntityBlackboard>(
		new ExecutionNode('Have a craving??', ({ entity }) => {
			const need = entity.needs.find((n) => n.id === 'food');
			if (!need) {
				throw new BehaviorError(`For some reason, ${entity} is unable to crave this`);
			}
			if (need.get() > 0.2) {
				throw new BehaviorError(`${entity} isn't feeling it`);
			}
		}),
		new SelectorNode(
			// If the entity has no food, go and buy food:
			new SequenceNode(
				new InverterNode(
					new ExecutionNode('Has nothing to satisfy this craving?', ({ entity }) => {
						if (!entity.inventory.getAvailableItems().some(config.materialFilter)) {
							throw new BehaviorError(`${entity} does not have any satisfactory items on hand`);
						}
					}),
				),
				createBuyFromMarketBehavior(
					(vendor): vendor is MarketBuildingEntity => vendor.type === 'market-stall',
					config.materialDesirabilityScore,
				),
			),

			// If the entity has food in inventory, eat from it:
			new SequenceNode<EntityBlackboard & { deal?: DesirabilityRecord }>(
				new ExecutionNode('Eat from inventory?', async ({ entity, deal }) => {
					// The material that is going to be consumed is either that of the deal made
					// in the previous BT node, or the most desirable item that the entity
					// already owns.
					const material = deal
						? deal.material
						: getMostDesirableItem(entity, [entity], config.materialDesirabilityScore)?.material;
					if (!material) {
						throw new BehaviorError(`${entity} does not have any edibles on hand`);
					}

					const need = entity.needs.find((n) => n.id === config.fulfilledNeedId);
					if (!need) {
						throw new BehaviorError(
							`Expected entity to need ${config.fulfilledNeedId}, but they don't`,
						);
					}

					console.log(
						`${entity} to consume ${material}, has ${entity.inventory.availableOf(material)}`,
					);
					await entity.$status.set(config.statusFormatter(material));
					await entity.inventory.change(material, -1);
					await need.set(need.get() + (material[config.fulfillingMaterialProperty] as number));
				}),
				createWaitBehavior(500, 3000),
				new ExecutionNode('Unset status', async ({ entity }) => {
					await entity.$status.set(null);
				}),
			),
		),
	);
}

/**
 * Preset configuration for finding something to drink, and drinking it
 */
createConsumeBehavior.DRINK = {
	fulfilledNeedId: 'water',
	fulfillingMaterialProperty: 'fluid',
	statusFormatter: (material) => `Sipping on ${material}`,
	materialFilter({ material }) {
		return material.fluid && !material.toxicity;
	},
	materialDesirabilityScore(entity, seller, material, quantity) {
		if (quantity <= 1 || entity.wallet.get() < material.value) {
			return 0;
		}
		// @TODO weigh in distance to seller, if seller is not the same as entity
		return material.fluid / material.value;
	},
} as ConsumptionType;

/**
 * Preset configuration for finding something to eat, and eating it
 */
createConsumeBehavior.EAT = {
	fulfilledNeedId: 'food',
	fulfillingMaterialProperty: 'nutrition',
	statusFormatter: (material) => `Munching on ${material}`,
	materialFilter({ material }) {
		return material.nutrition && !material.toxicity;
	},
	materialDesirabilityScore(entity, seller, material, quantity) {
		if (quantity <= 1 || entity.wallet.get() < material.value) {
			return 0;
		}
		// @TODO weigh in distance to seller, if seller is not the same as entity
		return material.nutrition / material.value;
	},
} as ConsumptionType;
