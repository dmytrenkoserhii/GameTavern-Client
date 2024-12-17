import { privateAxios } from '@/lib';

import {
  CreateListRequestData,
  EditListRequestData,
  GetListsRequestData,
  GetListsResponseData,
  List,
} from '../types';

export const ListsService = {
  async getLists(queryParams: GetListsRequestData): Promise<GetListsResponseData> {
    const response = await privateAxios.get<GetListsResponseData>('/lists', {
      params: queryParams,
    });
    return response.data;
  },

  async getCurrentList(id: string): Promise<List> {
    const response = await privateAxios.get<List>(`/lists/${id}`);
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

export default ListsService;
