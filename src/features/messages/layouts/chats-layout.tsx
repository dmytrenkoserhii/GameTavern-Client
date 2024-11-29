import { Outlet } from 'react-router-dom';

import { Grid, Paper, ScrollArea } from '@mantine/core';

import { ChatList } from '../components';

export const ChatsLayout = () => {
  return (
    <Grid>
      <Grid.Col span={3}>
        <Paper withBorder p="sm" style={{ height: 'calc(100dvh - 175px)' }}>
          <ScrollArea scrollbarSize={3} scrollHideDelay={2000} h="100%">
            <ChatList
              chats={[
                {
                  id: '1',
                  participantName: 'John Doe',
                  lastMessage: 'Hello, Hello, Hello, Hello, Hello, Hello, Hello',
                  lastMessageTime: new Date(),
                  unreadCount: 1,
                },
                {
                  id: '2',
                  participantName: 'Jane Doe',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '3',
                  participantName: 'Jim Beam',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '4',
                  participantName: 'John Doe',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '5',
                  participantName: 'Arsen',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '6',
                  participantName: 'Brian',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '7',
                  participantName: 'Anna',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '8',
                  participantName: 'John Doe',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '9',
                  participantName: 'Jane Doe',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '10',
                  participantName: 'Arsen',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '11',
                  participantName: 'Brian',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '12',
                  participantName: 'Anna',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
                {
                  id: '13',
                  participantName: 'Anna',
                  lastMessage: 'Hello',
                  lastMessageTime: new Date(),
                },
              ]}
            />
          </ScrollArea>
        </Paper>
      </Grid.Col>
      <Grid.Col span={9}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
};
