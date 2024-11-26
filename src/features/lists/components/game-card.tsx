import { Card, Stack, Text } from '@mantine/core';

import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* <Image src={game.image.medium_url} alt={game.name} /> */}
      <Stack gap="xs" mt="md">
        <Text fw={700} size="lg">
          {game.name}
        </Text>
        <Text size="sm">{game.description}</Text>
      </Stack>
    </Card>
  );
};
