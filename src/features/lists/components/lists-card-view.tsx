import { SimpleGrid } from '@mantine/core';

import { ListCard } from './list-card';

interface ListCardViewProps {
  lists: Array<{ id: number; title: string; gamesCount: number }>;
  onListClick: (id: number) => void;
}

export const ListCardView: React.FC<ListCardViewProps> = ({ lists, onListClick }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {lists.map((list) => (
        <ListCard
          key={list.id}
          title={list.title}
          gamesCount={list.gamesCount}
          onClick={() => onListClick(list.id)}
        />
      ))}
    </SimpleGrid>
  );
};
