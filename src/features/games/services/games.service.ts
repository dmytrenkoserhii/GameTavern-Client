import { GameApi } from '@/features/games-api';
import { privateAxios } from '@/lib';

import {
  CreateGameData,
  Game,
  GameQuestionRequestData,
  GameQuestionResponseData,
  UpdateGameOrderData,
} from '../types';

export const GamesService = {
  async createGame(data: CreateGameData) {
    const response = await privateAxios.post<Game>('/games', data);
    return response.data;
  },

  async getGamesByList(listId: number) {
    const response = await privateAxios.get<Game[]>(`/games/list/${listId}`);
    return response.data;
  },

  async getGameByDescription(description: string): Promise<GameApi[]> {
    const response = await privateAxios.post<GameApi[]>(
      '/ai/games-recommendations-by-description',
      {
        description,
      },
    );
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

  async updateGameOrder(updates: UpdateGameOrderData[]) {
    const response = await privateAxios.patch('/games/order', {
      updates,
    });
    return response.data;
  },

  async getGameInfoQuestions(params: GameQuestionRequestData): Promise<GameQuestionResponseData> {
    const response = await privateAxios.post<GameQuestionResponseData>('/ai/game-info', params);
    return response.data;
  },
};
