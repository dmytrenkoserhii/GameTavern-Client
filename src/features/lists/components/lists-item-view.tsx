import { Link } from 'react-router-dom';

import { Anchor, Stack } from '@mantine/core';

import { List } from '../types';
import { ListItem } from './list-item';

interface ListsItemViewProps {
  lists: List[];
}

export const ListsItemView: React.FC<ListsItemViewProps> = ({ lists }) => {
  return (
    <Stack gap="md">
      {lists.map((list) => (
        <Anchor
          key={list.id}
          component={Link}
          to={`/lists/${list.id}`}
          className="text-decoration-none"
        >
          <ListItem list={list} />
        </Anchor>
      ))}
    </Stack>
  );
};
