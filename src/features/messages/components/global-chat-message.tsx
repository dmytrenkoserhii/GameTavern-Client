import dayjs from 'dayjs';

import { Link } from 'react-router-dom';

import { Avatar, Box, Group, Paper, Text } from '@mantine/core';

import { getFriendRoute } from '@/enums/routes.enum';

import { GlobalMessage } from '../types';

interface GlobalChatMessageProps {
  message: GlobalMessage;
  isCurrentUser: boolean;
  isFullscreen?: boolean;
}

export const GlobalChatMessage = ({
  message,
  isCurrentUser,
  isFullscreen,
}: GlobalChatMessageProps) => {
  const sender = (
    <Group gap="xs" align="center" mb={2}>
      <Avatar
        src={message.from?.account?.avatar}
        size="xs"
        radius="xl"
        color="initials"
        name={message.from?.account?.username}
        variant="filled"
        allowedInitialsColors={['dark.8', 'orange.8', 'grape.8', 'green.8', 'red.8']}
      />
      <Text size="sm" fw={600} c={isCurrentUser ? 'dark.6' : 'dimmed'}>
        {message.from?.account?.username}
      </Text>
    </Group>
  );

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
        variant="filled"
        style={{
          maxWidth: isFullscreen ? '60%' : '80%',
          width: '100%',
          borderTopRightRadius: isCurrentUser ? 4 : 16,
          borderTopLeftRadius: isCurrentUser ? 16 : 4,
        }}
        bg={isCurrentUser ? 'secondary.8' : 'dark.5'}
      >
        <Group>
          <Box flex={1}>
            {isCurrentUser ? (
              sender
            ) : (
              <Link to={getFriendRoute(message.from.id)} style={{ textDecoration: 'none' }}>
                {sender}
              </Link>
            )}
            <Text size="sm" c={isCurrentUser ? 'white' : 'gray.3'}>
              {message.content}
            </Text>
          </Box>

          <Box c={isCurrentUser ? 'dark.6' : 'dimmed'} fz="xs" style={{ alignSelf: 'flex-end' }}>
            {dayjs(message.createdAt).format('HH:mm')}
          </Box>
        </Group>
      </Paper>
    </Box>
  );
};
