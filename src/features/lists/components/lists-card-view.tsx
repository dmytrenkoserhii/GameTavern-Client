import { SimpleGrid } from '@mantine/core';

import { List } from '../types';
import { ListCard } from './list-card';

interface ListCardViewProps {
  lists: Array<List>;
  onListClick: (id: number) => void;
}

export const ListCardView: React.FC<ListCardViewProps> = ({ lists, onListClick }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {lists.map((list) => (
        <ListCard key={list.id} list={list} onClick={() => onListClick(list.id)} />
      ))}
    </SimpleGrid>
  );
};
