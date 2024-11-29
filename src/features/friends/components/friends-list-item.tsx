import { BsChatDots } from 'react-icons/bs';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { Avatar, Badge, Box, Button, Group, Paper, Text } from '@mantine/core';

import { getFriendRoute } from '@/enums/routes.enum';

import { Friend } from '../types';

interface FriendsListItemProps {
  friend: Friend;
  onUnfollow: (id: string) => void;
  onMessage: (id: string) => void;
}

export const FriendsListItem = ({ friend, onUnfollow, onMessage }: FriendsListItemProps) => {
  const navigate = useNavigate();

  const onFriendClick = () => {
    navigate(getFriendRoute(friend.id));
  };

  const onMessageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onMessage(friend.id);
  };

  const onUnfollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onUnfollow(friend.id);
  };

  return (
    <Paper shadow="sm" withBorder style={{ cursor: 'pointer' }} onClick={onFriendClick}>
      <Group justify="space-between" p="sm">
        <Group gap="sm">
          <Box pos="relative">
            <Avatar
              src={friend.avatarUrl}
              size="md"
              radius="xl"
              color="initials"
              name={friend.username}
              variant="outline"
            />
            {friend.isOnline && (
              <Badge //Use Indicator instead
                size="xs"
                variant="filled"
                color="green"
                w={12}
                h={12}
                p={0}
                style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  borderRadius: '50%',
                  border: '2px solid var(--mantine-color-body)',
                }}
              />
            )}
          </Box>
          <Text fw={500}>{friend.username}</Text>
        </Group>

        <Group gap="xs">
          <Button
            color="blue"
            variant="outline"
            radius="sm"
            onClick={onMessageClick}
            leftSection={<BsChatDots />}
          >
            Message
          </Button>
          <Button
            color="red"
            variant="outline"
            radius="sm"
            onClick={onUnfollowClick}
            leftSection={<TiUserDeleteOutline />}
          >
            Unfollow
          </Button>
        </Group>
      </Group>
    </Paper>
  );
};
