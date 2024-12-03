import { Link } from 'react-router-dom';

import { Anchor, SimpleGrid } from '@mantine/core';

import { List } from '../types';
import { ListCard } from './list-card';

interface ListCardViewProps {
  lists: Array<List>;
}

export const ListCardView: React.FC<ListCardViewProps> = ({ lists }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {lists.map((list) => (
        <Anchor
          key={list.id}
          component={Link}
          to={`/lists/${list.id}`}
          className="text-decoration-none"
        >
          <ListCard list={list} />
        </Anchor>
      ))}
    </SimpleGrid>
  );
};
