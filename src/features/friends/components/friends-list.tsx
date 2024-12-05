import { useTranslation } from 'react-i18next';

import { Stack, Text } from '@mantine/core';

import { User } from '@/features/user';

import { Friend } from '../types';
import { FriendsListItem } from './friends-list-item';

interface FriendsListProps {
  friends: Friend[];
  currentUser: User;
  onDelete: (id: number) => void;
  onMessage: (id: number) => void;
}

export const FriendsList = ({ friends, currentUser, onDelete, onMessage }: FriendsListProps) => {
  const { t } = useTranslation();

  if (friends.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        {t('friends.no_friends')}
      </Text>
    );
  }

  return (
    <Stack>
      {friends.map((friend) => (
        <FriendsListItem
          key={friend.id}
          friend={friend}
          currentUser={currentUser}
          onDelete={onDelete}
          onMessage={onMessage}
        />
      ))}
    </Stack>
  );
};
