import { Link } from 'react-router-dom';

import { Stack } from '@mantine/core';

import { GameApi } from '@/features/games-api';

import { GameItem } from './game-item';

interface GamesItemViewProps {
  games: Array<GameApi>;
  onGameClick: (id: number) => void;
}

export const GamesItemView: React.FC<GamesItemViewProps> = ({ games, onGameClick }) => {
  return (
    <Stack gap="md">
      {games.map((game) => (
        <Link to={`/games/${game.id}`} key={game.id}>
          <GameItem key={game.id} game={game} onClick={() => onGameClick(game.id)} />
        </Link>
      ))}
    </Stack>
  );
};
