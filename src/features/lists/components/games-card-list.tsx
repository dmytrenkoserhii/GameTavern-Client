import { Link } from 'react-router-dom';

import { SimpleGrid } from '@mantine/core';

import { getGameRoute } from '@/enums';
import { GameApi } from '@/features/games-api';

import { GameCard } from './game-card';

interface GamesCardListProps {
  games: GameApi[];
}

export const GamesCardList: React.FC<GamesCardListProps> = ({ games }) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={{ base: 'sm', sm: 'md' }}
      verticalSpacing={{ base: 'sm', sm: 'md' }}
    >
      {games.map((game) => (
        <Link to={getGameRoute(game.id)} key={game.id}>
          <GameCard key={game.id} game={game} />
        </Link>
      ))}
    </SimpleGrid>
  );
};
