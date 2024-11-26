import { SimpleGrid } from '@mantine/core';

import { Game } from '../types';
import { GameCard } from './game-card';

interface GamesCardViewProps {
  games: Array<Game>;
  onGameClick: (id: number) => void;
}

export const GamesCardView: React.FC<GamesCardViewProps> = ({ games, onGameClick }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {games.map((game) => (
        <GameCard key={game.id} game={game} onClick={() => onGameClick(game.id)} />
      ))}
    </SimpleGrid>
  );
};
