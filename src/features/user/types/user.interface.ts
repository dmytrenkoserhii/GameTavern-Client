import { Role } from '../enums';
import { Account } from './account.interface';

export interface User {
  id: number;
  email: string;
  hashedPassword: string;
  role: Role;
  isAccountFilled: boolean;
  refreshToken: string;
  oauthId: string | null;
  isEmailVerified: boolean;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiresAt: Date | null;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  account: Account;
}
