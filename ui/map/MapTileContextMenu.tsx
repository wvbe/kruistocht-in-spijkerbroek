import { type EntityI, type TileI } from '@lib';
import React, { FC, PropsWithChildren, useMemo } from 'react';

import { useGameContext } from '../context/GameContext.tsx';
import { useSelectedEntity } from '../hooks/useSelectedEntity.tsx';

import { EntityBadge } from '../entities/EntityBadge.tsx';

const MapTileContextMenuItem: FC<
	PropsWithChildren & { onClick?: () => void; isDisabled?: boolean }
> = ({ children, onClick, isDisabled }) => {
	const className = useMemo(
		() =>
			[
				'map-tile-context-menu_item',
				isDisabled && 'map-tile-context-menu_item--disabled',
				onClick && !isDisabled && 'map-tile-context-menu_item--interactive',
			]
				.filter(Boolean)
				.join(' '),
		[isDisabled],
	);
	return (
		<div className={className} onClick={(!isDisabled && onClick) || undefined}>
			{children}
		</div>
	);
};
export const MapTileContextMenu: FC<{ tile: TileI; entity: EntityI }> = ({ tile }) => {
	const game = useGameContext();
	const selectedEntity = useSelectedEntity();

	const tileEntities = game.entities.filter((entity) =>
		// ['factory', 'market-stall', 'church', 'settlement'].includes(entity.type) &&
		entity.$$location.get().equals(tile),
	);
	return (
		<div className="map-tile-context-menu">
			<MapTileContextMenuItem>
				{tile.x},{tile.y}
			</MapTileContextMenuItem>
			{tileEntities.map((entity) => (
				<MapTileContextMenuItem key={entity.id} onClick={() => selectedEntity.set(entity)}>
					<EntityBadge entity={entity} />
				</MapTileContextMenuItem>
			))}
		</div>
	);
};
