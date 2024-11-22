import { privateAxios, publicAxios } from '@/lib';

import { ConfirmEmailRequestData, User } from '../types';

export const UsersService = {
  async getAllUsers() {
    const response = await privateAxios.get<User[]>('/users');
    return response.data;
  },
  async getCurrentUser() {
    const response = await privateAxios.get<User>('/users/current');
    return response.data;
  },
  async confirmUserEmail(token: ConfirmEmailRequestData) {
    return publicAxios.post('/users/confirm-email', token);
  },
  async resendConfirmationEmail() {
    return publicAxios.post('/users/reconfirm-email');
  },
};
