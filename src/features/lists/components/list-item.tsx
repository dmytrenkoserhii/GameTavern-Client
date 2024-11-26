import React from 'react';

import { Group, Paper, Text } from '@mantine/core';

import { List } from '../types';
import classes from './list-item.module.css';

interface ListItemProps {
  list: List;
  onClick: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ list, onClick }) => {
  return (
    <Paper shadow="xs" p="md" withBorder onClick={onClick} className={classes.item}>
      <Group>
        <Text size="md" fw={500}>
          {list.title}
        </Text>
      </Group>
    </Paper>
  );
};
