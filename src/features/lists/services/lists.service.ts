import { privateAxios } from '@/lib';
import { PaginatedResponse } from '@/types';

import {
  CreateListRequestData,
  EditListRequestData,
  GameRecommendation,
  GetListsRequestData,
  List,
} from '../types';

export const ListsService = {
  async getLists(queryParams: GetListsRequestData): Promise<PaginatedResponse<List>> {
    const response = await privateAxios.get<PaginatedResponse<List>>('/lists', {
      params: queryParams,
    });
    return response.data;
  },

  async getCurrentList(id: string): Promise<List> {
    const response = await privateAxios.get<List>(`/lists/${id}`);
    return response.data;
  },

  async getGamesRecommendations(
    games: string[],
    existingRecommendations?: string[],
  ): Promise<GameRecommendation[]> {
    const response = await privateAxios.post<GameRecommendation[]>(
      '/ai/list-games-recommendations',
      {
        games,
        existingRecommendations,
      },
    );
    return response.data;
  },

  async createList(createListData: CreateListRequestData): Promise<List> {
    const response = await privateAxios.post<List>('/lists', createListData);
    return response.data;
  },

  async editList(id: string, editListData: EditListRequestData): Promise<List> {
    const response = await privateAxios.patch<List>(`/lists/${id}`, editListData);
    return response.data;
  },

  async deleteList(id: string): Promise<void> {
    await privateAxios.delete(`/lists/${id}`);
  },
};
