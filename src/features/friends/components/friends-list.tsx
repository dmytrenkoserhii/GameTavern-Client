import { useTranslation } from 'react-i18next';

import { Stack, Text } from '@mantine/core';

import { Friend } from '../types';
import { FriendsListItem } from './friends-list-item';

interface FriendsListProps {
  friends: Friend[];
  onUnfollow: (id: string) => void;
  onMessage: (id: string) => void;
}

export const FriendsList = ({ friends, onUnfollow, onMessage }: FriendsListProps) => {
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
          onUnfollow={onUnfollow}
          onMessage={onMessage}
        />
      ))}
    </Stack>
  );
};
