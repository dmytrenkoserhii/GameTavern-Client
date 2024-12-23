import { GameApi } from './game-api.interface';

export interface GetGamesApiResponceData {
  games: GameApi[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
