import React from 'react';

import { Group, Paper, Text } from '@mantine/core';

import { List } from '../types';
import classes from './list-item.module.css';

interface ListItemProps {
  list: List;
}

export const ListItem: React.FC<ListItemProps> = ({ list }) => {
  return (
    <Paper shadow="xs" p="md" withBorder className={classes.item}>
      <Group>
        <Text size="md" fw={500}>
          {list.name}
        </Text>
      </Group>
    </Paper>
  );
};
