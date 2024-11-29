import { privateAxios } from '@/lib';

export const GlobalChatService = {
  async sendGlobalMessage(content: string) {
    const response = await privateAxios.post('/global-messages', { content });
    return response.data;
  },
  async getAllGlobalMessages() {
    const response = await privateAxios.get('/global-messages');
    return response.data;
  },
};
