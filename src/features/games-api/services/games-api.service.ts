import { privateAxios } from '@/lib';
import { GamesQueryParams } from '@/types';

import { GameApi, GetGamesApiResponceData, Platform } from '../types';

export const GamesApiService = {
  async getAllGames(queryParams: GamesQueryParams) {
    const response = await privateAxios.get<GetGamesApiResponceData>('/games-api/search', {
      params: queryParams,
    });
    return response.data;
  },
  async getGame(id: string) {
    const response = await privateAxios.get<GameApi>(`/games-api/${id}`);
    return response.data;
  },
  async getAllPlatforms() {
    const response = await privateAxios.get<Platform[]>('/games-api/platforms');
    return response.data;
  },
};
