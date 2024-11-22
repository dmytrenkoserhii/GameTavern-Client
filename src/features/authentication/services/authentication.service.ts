import { User } from '@/features/user';
import { privateAxios, publicAxios } from '@/lib';

import { SignInRequestData, SignUpRequestData } from '../types';

export const AuthService = {
  async signUp(signUpData: SignUpRequestData) {
    return publicAxios.post<{ user: User }>('/auth/sign-up', signUpData);
  },
  async signIn(signInData: SignInRequestData) {
    return publicAxios.post<{ user: User }>('/auth/sign-in', signInData);
  },
  async logout() {
    return privateAxios.get('/auth/logout');
  },
};
