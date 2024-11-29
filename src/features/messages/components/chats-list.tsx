import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Stack, Text } from '@mantine/core';

import { ChatsListItem } from './chats-list-item';

interface Chat {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount?: number;
}

interface ChatListProps {
  chats: Chat[];
}

export const ChatList = ({ chats }: ChatListProps) => {
  const { id } = useParams();
  const { t } = useTranslation();

  if (chats.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        {t('chats.no_chats')}
      </Text>
    );
  }

  return (
    <Stack>
      {chats.map((chat) => (
        <ChatsListItem key={chat.id} chat={chat} isOpen={chat.id === id} />
      ))}
    </Stack>
  );
};
