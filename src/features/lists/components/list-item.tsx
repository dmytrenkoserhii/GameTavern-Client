import React from 'react';

import { Group, Paper, Text } from '@mantine/core';

import classes from './list-item.module.css';

interface ListItemProps {
  title: string;
  onClick?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({ title, onClick }) => {
  return (
    <Paper shadow="xs" p="md" withBorder onClick={onClick} className={classes.item}>
      <Group>
        <Text size="md" fw={500}>
          {title}
        </Text>
      </Group>
    </Paper>
  );
};
