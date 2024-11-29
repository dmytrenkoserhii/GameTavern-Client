import { useTranslation } from 'react-i18next';

import { Stack, Title } from '@mantine/core';

import { FriendsList } from '../components';

const FriendsPage = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Title order={2}>{t('friends.title')}</Title>

      <FriendsList
        friends={[
          {
            id: '1',
            username: 'johndoe',
            avatarUrl: 'https://via.placehoerrorlder.com/150',
            isOnline: true,
          },
          {
            id: '2',
            username: 'janedoe',
            avatarUrl: 'https://via.placeholder.com/150',
            isOnline: false,
          },
          {
            id: '3',
            username: 'johnsmith',
            avatarUrl: 'https://via.placeholder.com/150',
            isOnline: true,
          },
          {
            id: '4',
            username: 'janesmith',
            avatarUrl: 'https://via.placeholder.com/150',
            isOnline: false,
          },
        ]}
        onUnfollow={() => {
          // eslint-disable-next-line no-console
          console.log('unfollow');
        }}
        onMessage={() => {
          // eslint-disable-next-line no-console
          console.log('message');
        }}
      />
    </Stack>
  );
};

export default FriendsPage;
