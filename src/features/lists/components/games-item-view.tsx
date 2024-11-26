import { Stack } from '@mantine/core';

import { Game } from '../types';
import { GameItem } from './game-item';

interface GamesItemViewProps {
  games: Array<Game>;
  onGameClick: (id: number) => void;
}

export const GamesItemView: React.FC<GamesItemViewProps> = ({ games, onGameClick }) => {
  return (
    <Stack gap="md">
      {games.map((game) => (
        <GameItem key={game.id} game={game} onClick={() => onGameClick(game.id)} />
      ))}
    </Stack>
  );
};
