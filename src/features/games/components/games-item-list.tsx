import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import React from 'react';

import { Stack } from '@mantine/core';

import { Game } from '../types';
import { GameItem } from './game-item';
import { SortableGameWrapper } from './sortable-game-wrapper';

interface GamesItemListProps {
  games: Game[];
  listId: number;
  isEditing?: boolean;
  onReorder: (oldIndex: number, newIndex: number) => void;
}

export const GamesItemList: React.FC<GamesItemListProps> = ({
  games,
  listId,
  isEditing,
  onReorder,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = games.findIndex((game) => String(game.id) === active.id);
    const newIndex = games.findIndex((game) => String(game.id) === over.id);

    onReorder(oldIndex, newIndex);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext
        items={games.map((game) => String(game.id))}
        strategy={verticalListSortingStrategy}
      >
        <Stack>
          {games.map((game) => (
            <SortableGameWrapper key={game.id} id={game.id} isEditing={isEditing}>
              <GameItem game={game} listId={listId} isEditing={isEditing} />
            </SortableGameWrapper>
          ))}
        </Stack>
      </SortableContext>
    </DndContext>
  );
};
