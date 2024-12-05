import { User } from '@/features/user';

import { FriendStatus } from '../enums';

export interface Friend {
  id: number;
  sender: User;
  receiver: User;
  status: FriendStatus;
  createdAt: Date;
  updatedAt: Date;
}
