import { Group, Paper, Text } from '@mantine/core';

import { Game } from '../types';

interface GameItemProps {
  game: Game;
  onClick: () => void;
}

export const GameItem: React.FC<GameItemProps> = ({ game, onClick }) => {
  return (
    <Paper shadow="xs" p="md" withBorder onClick={onClick} style={{ cursor: 'pointer' }}>
      <Group>
        <Text size="md" fw={500}>
          {game.name}
        </Text>
        <Text size="sm">{game.description}</Text>
      </Group>
    </Paper>
  );
};
