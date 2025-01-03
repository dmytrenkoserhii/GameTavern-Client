import { Link } from 'react-router-dom';

import { Stack } from '@mantine/core';

import { getGameRoute } from '@/enums';
import { GameApi } from '@/features/games-api';

import { GameItem } from './game-item';

interface GamesItemListProps {
  games: GameApi[];
}

export const GamesItemList: React.FC<GamesItemListProps> = ({ games }) => {
  return (
    <Stack gap="md">
      {games.map((game) => (
        <Link to={getGameRoute(game.id)} key={game.id}>
          <GameItem key={game.id} game={game} />
        </Link>
      ))}
    </Stack>
  );
};
