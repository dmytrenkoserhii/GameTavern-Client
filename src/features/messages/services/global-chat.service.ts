import { privateAxios } from '@/lib';
import { PaginatedResponse } from '@/types';

import { GlobalMessage } from '../types';

export const GlobalChatService = {
  async sendGlobalMessage(content: string) {
    const response = await privateAxios.post('/global-messages', { content });
    return response.data;
  },
  async getAllGlobalMessages(
    limit: number,
    page: number,
  ): Promise<PaginatedResponse<GlobalMessage>> {
    const response = await privateAxios.get<PaginatedResponse<GlobalMessage>>('/global-messages', {
      params: { limit, page },
    });
    return response.data;
  },
};
