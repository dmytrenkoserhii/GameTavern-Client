import { privateAxios } from '@/lib';

import { AddGameData, Game } from '../types';

export const GamesService = {
  async addGame(data: AddGameData) {
    const response = await privateAxios.post<Game>('/games', data);
    return response.data;
  },

  async getGamesByList(listId: number) {
    const response = await privateAxios.get<Game[]>(`/games/list/${listId}`);
    return response.data;
  },

  async removeGame(gameId: number) {
    await privateAxios.delete(`/games/${gameId}`);
  },

  async moveGame(gameId: number, targetListId: number) {
    const response = await privateAxios.patch(`/games/${gameId}/move`, {
      targetListId,
    });
    return response.data;
  },

  async updateGameOrder(updates: { id: number; orderNumber: number }[]) {
    const response = await privateAxios.patch('/games/order', {
      updates,
    });
    return response.data;
  },
};
