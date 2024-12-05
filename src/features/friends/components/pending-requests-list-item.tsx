import { useTranslation } from 'react-i18next';
import { BsCheck } from 'react-icons/bs';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Group, Paper, Stack, Text } from '@mantine/core';

import { getFriendRoute } from '@/enums/routes.enum';
import { User } from '@/features/user';

import { Friend } from '../types';

interface PendingRequestsListItemProps {
  friend: Friend;
  onAcceptIncoming: (id: number) => void;
  onRejectIncoming: (id: number) => void;
  onDeleteOutgoing: (id: number) => void;
  currentUser: User;
}

export const PendingRequestsListItem = ({
  friend,
  onAcceptIncoming,
  onRejectIncoming,
  onDeleteOutgoing,
  currentUser,
}: PendingRequestsListItemProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onFriendClick = () => {
    navigate(getFriendRoute(friend.id));
  };

  const onAcceptIncomingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAcceptIncoming(friend.id);
  };

  const onRejectIncomingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRejectIncoming(friend.id);
  };

  const onDeleteOutgoingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDeleteOutgoing(friend.id);
  };

  const userToDisplay = friend.sender.id === currentUser.id ? friend.receiver : friend.sender;
  const actionButtons =
    currentUser.id === friend.sender.id ? (
      <Button
        color="red"
        variant="outline"
        radius="sm"
        onClick={onDeleteOutgoingClick}
        leftSection={<TiUserDeleteOutline />}
      >
        Delete
      </Button>
    ) : (
      <>
        <Button
          color="green"
          variant="outline"
          radius="sm"
          onClick={onAcceptIncomingClick}
          leftSection={<BsCheck />}
        >
          {t('general.accept')}
        </Button>
        <Button
          color="red"
          variant="outline"
          radius="sm"
          onClick={onRejectIncomingClick}
          leftSection={<TiUserDeleteOutline />}
        >
          {t('general.reject')}
        </Button>
      </>
    );

  return (
    <Paper shadow="sm" withBorder style={{ cursor: 'pointer' }} onClick={onFriendClick}>
      <Group justify="space-between" p="sm">
        <Group gap="sm">
          <Box pos="relative">
            <Avatar
              src={userToDisplay.account.avatar}
              size="md"
              radius="xl"
              color="initials"
              name={userToDisplay.account.username}
              variant="outline"
            />
          </Box>
          <Stack gap={0}>
            <Text fw={500}>{userToDisplay.account.username}</Text>
            <Text c="dimmed">{userToDisplay.email}</Text>
          </Stack>
        </Group>

        <Group gap="xs">{actionButtons}</Group>
      </Group>
    </Paper>
  );
};
