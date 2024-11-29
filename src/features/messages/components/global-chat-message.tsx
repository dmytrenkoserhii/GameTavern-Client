import { Box, Paper, Text } from '@mantine/core';

import { GlobalMessage } from '../types';

interface GlobalChatMessageProps {
  message: GlobalMessage;
  isCurrentUser: boolean;
}

export const GlobalChatMessage = ({ message, isCurrentUser }: GlobalChatMessageProps) => {
  return (
    <Box
      mb="xs"
      style={{
        display: 'flex',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        width: '100%',
      }}
    >
      <Paper
        p="sm"
        radius="md"
        withBorder
        style={{
          maxWidth: '80%',
          width: '100%',
          borderColor: isCurrentUser ? 'var(--mantine-color-primary-filled)' : '',
        }}
      >
        <Text size="sm" fw={600} c="dimmed" mb={4}>
          {message.from?.account?.username}
        </Text>
        <Text size="sm">{message.content}</Text>
      </Paper>
    </Box>
  );
};
