import { Link } from 'react-router-dom';

import { SimpleGrid } from '@mantine/core';

import { GameApi } from '@/features/games-api';

import { GameCard } from './game-card';

interface GamesCardViewProps {
  games: Array<GameApi>;
  onGameClick: (id: number) => void;
}

export const GamesCardView: React.FC<GamesCardViewProps> = ({ games, onGameClick }) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 6 }}
      spacing={{ base: 'sm', sm: 'md' }}
      verticalSpacing={{ base: 'sm', sm: 'md' }}
    >
      {games.map((game) => (
        <Link to={`/games/${game.id}`} key={game.id}>
          <GameCard key={game.id} game={game} onClick={() => onGameClick(game.id)} />
        </Link>
      ))}
    </SimpleGrid>
  );
};
