import { User } from '@/features/user';

export interface GlobalMessage {
  id: number;
  content: string;
  from: User;
  createdAt: Date;
  updatedAt: Date;
}
