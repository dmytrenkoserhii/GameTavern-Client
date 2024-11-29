import { Stack, Title } from '@mantine/core';

import { ChatList } from '../components';

const ChatsPage = () => {
  return (
    <Stack>
      <Title order={2}>Chats</Title>

      <ChatList
        chats={[
          {
            id: '1',
            participantName: 'John Doe',
            lastMessage: 'Hello',
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
        ]}
      />
    </Stack>
  );
};

export default ChatsPage;
