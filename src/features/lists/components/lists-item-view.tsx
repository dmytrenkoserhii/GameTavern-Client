import { Stack } from '@mantine/core';

import { List } from '../types';
import { ListItem } from './list-item';

interface ListsItemViewProps {
  lists: Array<List>;
  onListClick: (id: number) => void;
}

export const ListsItemView: React.FC<ListsItemViewProps> = ({ lists, onListClick }) => {
  return (
    <Stack gap="md">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} onClick={() => onListClick(list.id)} />
      ))}
    </Stack>
  );
};
