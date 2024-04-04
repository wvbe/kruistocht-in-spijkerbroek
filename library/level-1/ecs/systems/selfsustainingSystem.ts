import Game from '../../Game.ts';
import { Need } from '../../entities/Need.ts';
import { byEcsComponents } from '../assert.ts';
import { EcsSystem } from '../classes/EcsSystem.ts';
import { eventLogComponent } from '../components/eventLogComponent.ts';
import { inventoryComponent } from '../components/inventoryComponent.ts';
import { needsComponent } from '../components/needsComponent.ts';
import { EcsEntity } from '../types.ts';

type SelfSustainingEnitity = EcsEntity<
	typeof needsComponent | typeof inventoryComponent,
	typeof eventLogComponent
>;

function attachSystemToEntityNeed(game: Game, entity: SelfSustainingEnitity, need: Need) {
	const satisfy = async () => {
		while (need.get() < 0.9) {
			const stock = entity.inventory
				.getAvailableItems()
				.filter((item) => item.material[need.id] > 0)
				.sort((a, b) => a.material[need.id] - b.material[need.id])
				.shift();
			if (!stock) {
				break;
			}

			entity.events?.add(`Satisfying ${need.id} with ${stock.material}`);

			await entity.inventory.change(stock.material, -1);
			await game.time.wait(1 * 1_000);
			need.set(Math.min(1, need.get() + stock.material[need.id]));
		}
	};
	need.onBelow(0.3, satisfy);
	entity.inventory.$change.on(() => {
		if (need.get() < 0.3) {
			satisfy();
		}
	});
}

async function attachSystemToEntity(game: Game, entity: SelfSustainingEnitity) {
	attachSystemToEntityNeed(game, entity, entity.needs.nutrition);
	attachSystemToEntityNeed(game, entity, entity.needs.hydration);
}

async function attachSystem(game: Game) {
	game.entities.$add.on(async (entities) => {
		await Promise.all(
			entities
				.filter(byEcsComponents([needsComponent, inventoryComponent]))
				.map((entity) => attachSystemToEntity(game, entity)),
		);
	});
}

/**
 * This system lets entities who have _needs_ (nutrition, hydration, etc) and
 * an inventory grab items from that inventory to satistfy their needs.
 *
 * Every time they do, they will grab as many items as needed to satisfy the particular
 * need to at least 90%, or slightly over if the item they are consuming is very satisfactory.
 *
 * Consuming an item will take a little time, at the end of which the need is fulfilled for
 * the nutritional value of that item. While the item is being consumed, that need does not degrade.
 * An entity can consume materials to satisfy different needs at the same time.
 *
 * @todo Pick items even more efficiently so that the need is never satisfied beyond 100%.
 * @todo Plus _all_ the needs that are satisfied by an item, eg. nutrition+hydration at the
 *   same time when eating an apple.
 */
export const selfsustainingSystem = new EcsSystem(attachSystem);
