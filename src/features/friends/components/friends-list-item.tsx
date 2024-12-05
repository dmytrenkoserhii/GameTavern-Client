import { useTranslation } from 'react-i18next';
import { BsChatDots } from 'react-icons/bs';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Group, Indicator, Paper, Stack, Text } from '@mantine/core';

import { getFriendRoute } from '@/enums/routes.enum';
import { User } from '@/features/user';

import { Friend } from '../types';

interface FriendsListItemProps {
  friend: Friend;
  currentUser: User;
  onDelete: (id: number) => void;
  onMessage: (id: number) => void;
}

export const FriendsListItem = ({
  friend,
  currentUser,
  onDelete,
  onMessage,
}: FriendsListItemProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onFriendClick = () => {
    navigate(getFriendRoute(friend.id));
  };

  const onMessageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onMessage(friend.id);
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(friend.id);
  };

  const userToDisplay = friend.sender.id === currentUser.id ? friend.receiver : friend.sender;

  return (
    <Paper shadow="sm" withBorder style={{ cursor: 'pointer' }} onClick={onFriendClick}>
      <Group justify="space-between" p="sm">
        <Group gap="sm">
          <Box pos="relative">
            <Indicator
              size={12}
              color="green"
              withBorder
              // disabled={}
              offset={6}
              position="bottom-end"
              processing
            >
              <Avatar
                src={userToDisplay.account.avatar}
                size="md"
                radius="xl"
                color="initials"
                name={userToDisplay.account.username}
                variant="outline"
              />
            </Indicator>
          </Box>
          <Stack gap={0}>
            <Text fw={500}>{userToDisplay.account.username}</Text>
            <Text c="dimmed">{userToDisplay.email}</Text>
          </Stack>
        </Group>

        <Group gap="xs">
          <Button
            color="blue"
            variant="outline"
            radius="sm"
            onClick={onMessageClick}
            leftSection={<BsChatDots />}
          >
            {t('general.message')}
          </Button>
          <Button
            color="red"
            variant="outline"
            radius="sm"
            onClick={onDeleteClick}
            leftSection={<TiUserDeleteOutline />}
          >
            {t('general.delete')}
          </Button>
        </Group>
      </Group>
    </Paper>
  );
};
