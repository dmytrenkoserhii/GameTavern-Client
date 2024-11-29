import { Paper, ScrollArea } from '@mantine/core';

import { ChatMessagesList } from '../components';

const ChatPage = () => {
  return (
    <Paper withBorder p="sm" style={{ height: 'calc(100dvh - 175px)' }}>
      <ScrollArea scrollbarSize={3} scrollHideDelay={2000} h="100%">
        <ChatMessagesList
          messages={[
            {
              id: '1',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'John Doe',
              userId: '1',
            },
            {
              id: '2',
              message:
                'Hello, Hello, Hello, Hello, Hello, Hello Hello, Hello, Hello, Hello, Hello, Hello Hello, Hello, Hello, Hello, Hello, Hello Hello, Hello, Hello, Hello, Hello, Hello , Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
            {
              id: '3',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'John Doe',
              userId: '1',
            },
            {
              id: '4',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
            {
              id: '5',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'John Doe',
              userId: '1',
            },
            {
              id: '6',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
            {
              id: '7',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'John Doe',
              userId: '1',
            },
            {
              id: '8',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
            {
              id: '9',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'John Doe',
              userId: '1',
            },
            {
              id: '10',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
            {
              id: '11',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'John Doe',
              userId: '1',
            },
            {
              id: '12',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
            {
              id: '13',
              message: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
              timestamp: new Date().toISOString(),
              username: 'Jane Doe',
              userId: '2',
            },
          ]}
          currentUserId="1"
        />
      </ScrollArea>
    </Paper>
  );
};

export default ChatPage;
