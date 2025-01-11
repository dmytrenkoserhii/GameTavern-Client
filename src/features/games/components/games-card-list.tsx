import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { SimpleGrid } from '@mantine/core';

import { Game } from '@/features/games';
import { GameApi } from '@/features/games-api';

import { GameCard } from './game-card';
import { SortableGameWrapper } from './sortable-game-wrapper';

interface GamesCardListProps {
  games: Game[] | GameApi[];
  listId?: number;
  isEditing?: boolean;
  onReorder?: (oldIndex: number, newIndex: number) => void;
}

export const GamesCardList: React.FC<GamesCardListProps> = ({
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

    if (onReorder) {
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={games.map((g) => String(g.id))} strategy={rectSortingStrategy}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 6 }}>
          {games.map((game) => (
            <SortableGameWrapper key={game.id} id={game.id} isEditing={isEditing}>
              <GameCard game={game} listId={listId} isEditing={isEditing} />
            </SortableGameWrapper>
          ))}
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  );
};
