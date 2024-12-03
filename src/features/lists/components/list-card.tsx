import { Card, Group, Stack, Text } from '@mantine/core';

import { List } from '../types';

interface ListCardProps {
  list: List;
}

export const ListCard: React.FC<ListCardProps> = ({ list }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: 'pointer' }}>
      <Card.Section p="md">
        <Group gap="sm" justify="space-between" grow>
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              style={{
                height: 120,
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                flex: 1,
              }}
            />
          ))}
        </Group>
      </Card.Section>

      <Stack gap={4} mt="sm">
        <Text fw={700} size="lg" lineClamp={1}>
          {list.name}
        </Text>
        <Text c="dimmed" size="sm">
          {list.games.length} {/*Games*/}
        </Text>
      </Stack>
    </Card>
  );
};
