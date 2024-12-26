import { Link } from 'react-router-dom';

import { Stack } from '@mantine/core';

import { getGameRoute } from '@/enums';
import { GameApi } from '@/features/games-api';

import { GameItem } from './game-item';

interface GamesItemListProps {
  games: Array<GameApi>;
  onGameClick: (id: number) => void;
}

export const GamesItemList: React.FC<GamesItemListProps> = ({ games, onGameClick }) => {
  return (
    <Stack gap="md">
      {games.map((game) => (
        <Link to={getGameRoute(game.id.toString())} key={game.id}>
          <GameItem key={game.id} game={game} onClick={() => onGameClick(game.id)} />
        </Link>
      ))}
    </Stack>
  );
};
