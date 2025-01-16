import { Game } from '@/features/games';
import { GameApi } from '@/features/games-api';

export const getImageUrl = (game: GameApi | Game): string => {
  if ('image' in game) {
    return (game as GameApi).image?.medium_url || '';
  }
  return (game as Game).coverUrl || '';
};
