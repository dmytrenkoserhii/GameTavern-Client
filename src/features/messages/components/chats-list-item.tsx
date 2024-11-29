import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';

import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';

import { getChatRoute } from '@/enums/routes.enum';

interface Chat {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount?: number;
}

interface ChatListItemProps {
  chat: Chat;
  isOpen?: boolean;
}

export const ChatsListItem = ({ chat, isOpen }: ChatListItemProps) => {
  const navigate = useNavigate();

  const onChatClick = () => {
    navigate(getChatRoute(chat.id));
  };

  return (
    <Paper
      shadow="sm"
      withBorder
      style={{ cursor: 'pointer' }}
      onClick={onChatClick}
      styles={{
        root: {
          borderColor: isOpen ? 'var(--mantine-color-primary-5)' : '',
        },
      }}
    >
      <Group justify="space-between" p="sm" wrap="nowrap">
        <Group gap="sm" wrap="nowrap">
          <Avatar
            src={chat.participantAvatar}
            size="md"
            radius="xl"
            color="initials"
            name={chat.participantName}
            variant="outline"
          />
          <Stack gap={4}>
            <Text fw={500}>{chat.participantName}</Text>
            <Text size="sm" c="dimmed" lineClamp={1}>
              {chat.lastMessage}
            </Text>
          </Stack>
        </Group>

        <Stack gap={4} align="center">
          <Text size="xs" c="dimmed">
            {dayjs(chat.lastMessageTime).format('HH:mm')}
          </Text>
          {chat.unreadCount ? (
            <Text size="xs" bg="secondary" c="white" px={8} py={2} style={{ borderRadius: '10px' }}>
              {chat.unreadCount}
            </Text>
          ) : null}
        </Stack>
      </Group>
    </Paper>
  );
};
