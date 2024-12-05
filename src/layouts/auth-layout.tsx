import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Footer, Header, Navbar } from '@/components';
import { useFriendsSocket } from '@/features/friends';
import { GlobalChat, GlobalChatButton } from '@/features/messages';
import { getGlobalChatSocket } from '@/lib/sockets';

const globalChatSocket = getGlobalChatSocket();

export const AuthLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const [globalChatOpened, { toggle: toggleGlobalChat }] = useDisclosure();
  const [hasNewMessages, setHasNewMessages] = React.useState(false);

  useFriendsSocket();

  const onNewMessage = () => {
    if (!globalChatOpened) {
      setHasNewMessages(true);
    }
  };

  React.useEffect(() => {
    globalChatSocket.on('new_global_message', onNewMessage);

    return () => {
      globalChatSocket.off('new_global_message', onNewMessage);
    };
  }, []);

  const handleToggleGlobalChat = () => {
    setHasNewMessages(false);
    toggleGlobalChat();
  };

  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 60 }}
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
      <GlobalChatButton
        toggleChat={handleToggleGlobalChat}
        isOpen={globalChatOpened}
        hasNewMessages={hasNewMessages}
      />
      <GlobalChat opened={globalChatOpened} messages={[]} />
    </AppShell>
  );
};
