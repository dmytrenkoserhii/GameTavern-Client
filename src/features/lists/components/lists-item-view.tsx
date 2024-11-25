import { Stack } from '@mantine/core';

import { ListItem } from './list-item';

interface ListsItemViewProps {
  lists: Array<{ id: number; title: string }>;
  onListClick: (id: number) => void;
}

export const ListsItemView: React.FC<ListsItemViewProps> = ({ lists, onListClick }) => {
  return (
    <Stack gap="md">
      {lists.map((list) => (
        <ListItem key={list.id} title={list.title} onClick={() => onListClick(list.id)} />
      ))}
    </Stack>
  );
};
