import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import React from 'react';

import { Stack } from '@mantine/core';

import { GameApi } from '@/features/games-api';

import { Game } from '../types';
import { GameItem } from './game-item';
import { SortableGameWrapper } from './sortable-game-wrapper';

interface GamesItemListProps {
  games: Game[] | GameApi[];
  listId?: number;
  isEditing?: boolean;
  onReorder?: (oldIndex: number, newIndex: number) => void;
}

export const GamesItemList: React.FC<GamesItemListProps> = ({
  games,
  listId,
  isEditing,
  onReorder,
}) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!onReorder) {
      return;
    }

    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = games.findIndex((game) => String(game.id) === active.id);
    const newIndex = games.findIndex((game) => String(game.id) === over.id);

    onReorder(oldIndex, newIndex);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
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
