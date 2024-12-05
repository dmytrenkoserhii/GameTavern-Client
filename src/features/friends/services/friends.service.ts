import { privateAxios } from '@/lib';
import { PaginatedResponse } from '@/types';

import { Friend } from '../types';

export const FriendsService = {
  async sendFriendRequest(data: { email: string }): Promise<Friend> {
    const response = await privateAxios.post('/friends/request', data);
    return response.data;
  },

  async acceptFriendRequest(requestId: number): Promise<Friend> {
    const response = await privateAxios.post(`/friends/accept/${requestId}`);
    return response.data;
  },

  async rejectFriendRequest(requestId: number): Promise<Friend> {
    const response = await privateAxios.post(`/friends/reject/${requestId}`);
    return response.data;
  },

  async getFriendsList(limit: number = 10, page: number = 1): Promise<PaginatedResponse<Friend>> {
    const response = await privateAxios.get<PaginatedResponse<Friend>>('/friends', {
      params: { limit, page },
    });
    return response.data;
  },

  async getPendingIncomingRequests(
    limit: number = 10,
    page: number = 1,
  ): Promise<PaginatedResponse<Friend>> {
    const response = await privateAxios.get<PaginatedResponse<Friend>>(
      '/friends/pending/incoming',
      {
        params: { limit, page },
      },
    );
    return response.data;
  },

  async getPendingOutgoingRequests(
    limit: number = 10,
    page: number = 1,
  ): Promise<PaginatedResponse<Friend>> {
    const response = await privateAxios.get<PaginatedResponse<Friend>>(
      '/friends/pending/outgoing',
      {
        params: { limit, page },
      },
    );
    return response.data;
  },

  async getRejectedIncomingRequests(
    limit: number = 10,
    page: number = 1,
  ): Promise<PaginatedResponse<Friend>> {
    const response = await privateAxios.get<PaginatedResponse<Friend>>(
      '/friends/rejected/incoming',
      {
        params: { limit, page },
      },
    );
    return response.data;
  },

  async getRejectedOutgoingRequests(
    limit: number = 10,
    page: number = 1,
  ): Promise<PaginatedResponse<Friend>> {
    const response = await privateAxios.get<PaginatedResponse<Friend>>(
      '/friends/rejected/outgoing',
      {
        params: { limit, page },
      },
    );
    return response.data;
  },

  async delete(id: number): Promise<Friend> {
    const response = await privateAxios.delete(`/friends/${id}`);
    return response.data;
  },

  async resendFriendRequest(id: number): Promise<Friend> {
    const response = await privateAxios.post(`/friends/resend/${id}`);
    return response.data;
  },
};
