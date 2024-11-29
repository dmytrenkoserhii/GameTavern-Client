import { useEffect, useRef } from 'react';

import { Stack } from '@mantine/core';

import { ChatMessagesListItem } from './chat-messages-list-item';

interface Message {
  id: string;
  message: string;
  timestamp: string;
  username: string;
  userId: string;
}

interface ChatMessagesListProps {
  messages: Message[];
  currentUserId: string;
}

export const ChatMessagesList = ({ messages, currentUserId }: ChatMessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Stack h="100%" p="sm">
      {messages.map((message) => (
        <ChatMessagesListItem
          key={message.id}
          message={message.message}
          timestamp={message.timestamp}
          username={message.username}
          isCurrentUser={message.userId === currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </Stack>
  );
};
