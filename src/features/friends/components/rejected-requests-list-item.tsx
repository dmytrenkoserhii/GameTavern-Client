import { useTranslation } from 'react-i18next';
import { BsArrowRepeat, BsCheck } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Group, Paper, Stack, Text } from '@mantine/core';

import { getFriendRoute } from '@/enums/routes.enum';
import { User } from '@/features/user';

import { Friend } from '../types';

interface RejectedRequestsListItemProps {
  friend: Friend;
  currentUser: User;
  onAccept: (id: number) => void;
  onResend: (id: number) => void;
}

export const RejectedRequestsListItem = ({
  friend,
  currentUser,
  onAccept,
  onResend,
}: RejectedRequestsListItemProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const onFriendClick = () => {
    navigate(getFriendRoute(friend.id));
  };

  const onAcceptClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAccept(friend.id);
  };

  const onResendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onResend(friend.id);
  };

  const userToDisplay = friend.sender.id === currentUser.id ? friend.receiver : friend.sender;
  const actionButton =
    currentUser.id === friend.sender.id ? (
      <Button
        color="blue"
        variant="outline"
        radius="sm"
        onClick={onResendClick}
        leftSection={<BsArrowRepeat />}
      >
        {t('general.resend')}
      </Button>
    ) : (
      <Button
        color="green"
        variant="outline"
        radius="sm"
        onClick={onAcceptClick}
        leftSection={<BsCheck />}
      >
        {t('general.accept')}
      </Button>
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

        <Group gap="xs">{actionButton}</Group>
      </Group>
    </Paper>
  );
};
