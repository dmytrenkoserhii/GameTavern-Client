import { privateAxios } from '@/lib';

import { CreateGameData, Game, UpdateGameOrderData } from '../types';

export const GamesService = {
  async createGame(data: CreateGameData) {
    const response = await privateAxios.post<Game>('/games', data);
    return response.data;
  },

  async getGamesByList(listId: number) {
    const response = await privateAxios.get<Game[]>(`/games/list/${listId}`);
    return response.data;
  },

  async deleteGame(gameId: number) {
    await privateAxios.delete(`/games/${gameId}`);
  },

  async moveGame(gameId: number, targetListId: number) {
    const response = await privateAxios.patch(`/games/${gameId}/move`, {
      targetListId,
    });
    return response.data;
  },

  async updateGameOrder(updates: UpdateGameOrderData['updates']) {
    const response = await privateAxios.patch('/games/order', {
      updates,
    });
    return response.data;
  },
};
