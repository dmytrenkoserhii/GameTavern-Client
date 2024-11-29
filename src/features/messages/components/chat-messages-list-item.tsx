import { Avatar, Group, Paper, Stack, Text } from '@mantine/core';

interface ChatMessagesListItemProps {
  message: string;
  timestamp: string;
  username: string;
  isCurrentUser: boolean;
  participantAvatar?: string;
  showCurrentUserAvatar?: boolean;
  showParticipantAvatar?: boolean;
}

export const ChatMessagesListItem = ({
  message,
  timestamp,
  username,
  participantAvatar,
  isCurrentUser,
  showCurrentUserAvatar = false,
  showParticipantAvatar = false,
}: ChatMessagesListItemProps) => {
  return (
    <Stack align={isCurrentUser ? 'flex-end' : 'flex-start'} gap="xs">
      <Group gap="xs" justify={isCurrentUser ? 'flex-end' : 'flex-start'} h={26.5}>
        {((isCurrentUser && showCurrentUserAvatar) || showParticipantAvatar) && (
          <Avatar
            src={participantAvatar}
            size="sm"
            radius="xl"
            color="initials"
            name={username}
            variant="outline"
          />
        )}
        <Text size="sm" c={isCurrentUser ? 'secondary' : 'dimmed'}>
          {username}
        </Text>
        <Text size="xs" c="dimmed">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Group>

      <Paper
        p="sm"
        radius="lg"
        style={{
          maxWidth: '70%',
          borderTopRightRadius: isCurrentUser ? 4 : 16,
          borderTopLeftRadius: isCurrentUser ? 16 : 4,
        }}
        bg={isCurrentUser ? 'secondary' : 'dark.5'}
      >
        <Text c={isCurrentUser ? 'white' : 'gray.3'}>{message}</Text>
      </Paper>
    </Stack>
  );
};
