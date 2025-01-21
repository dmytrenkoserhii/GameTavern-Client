import { Box, Card, Group, Stack, Text } from '@mantine/core';

import { List } from '../types';

interface ListCardProps {
  list: List;
}

export const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const displayGames = list.games?.slice(0, 4) || [];

  return (
    <Card
      p={0}
      radius="md"
      style={{
        cursor: 'pointer',
        backgroundColor: '#25262b',
        border: 'none',
      }}
    >
      <Group gap={0} wrap="nowrap">
        {displayGames.map((game, index) => (
          <Box
            key={index}
            style={{
              height: 140,
              width: '25%',
              backgroundImage: game.coverUrl ? `url(${game.coverUrl})` : 'none',
              backgroundColor: '#2C2E33',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {[...Array(Math.max(0, 4 - displayGames.length))].map((_, index) => (
          <Box
            key={`empty-${index}`}
            style={{
              height: 140,
              width: '25%',
              backgroundColor: '#2C2E33',
            }}
          />
        ))}
      </Group>

      <Stack gap={2} p="sm">
        <Text fw={500} size="sm" c="white" lineClamp={1}>
          {list.name}
        </Text>
        <Text c="dimmed" size="xs">
          {list.games?.length || 0} Games
          {/* TODO: Use Interpolation for pluralizing the word "Game" */}
        </Text>
      </Stack>
    </Card>
  );
};
