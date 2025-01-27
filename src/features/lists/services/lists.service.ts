import { GameApi } from '@/features/games-api';
import { privateAxios } from '@/lib';
import { PaginatedResponse } from '@/types';

import {
  CreateListRequestData,
  EditListRequestData,
  GetListsRequestData,
  List,
  RecommendationsParams,
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

  async getGamesRecommendations(params: RecommendationsParams): Promise<GameApi[]> {
    const response = await privateAxios.post<GameApi[]>('/ai/list-games-recommendations', params);
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
