import React from 'react';

import {
  Affix,
  Box,
  Button,
  LoadingOverlay,
  Paper,
  Portal,
  Stack,
  Transition,
} from '@mantine/core';

import { useMutation, useQuery } from '@tanstack/react-query';

import { User, UsersService } from '@/features/user';
import { getGlobalChatSocket } from '@/lib/global-chat-socket';

import { GlobalChatService } from '../services';
import { GlobalMessage } from '../types';
import { GlobalChatForm } from './global-chat-form';
import { GlobalChatMessage } from './global-chat-message';

const socket = getGlobalChatSocket();

interface GlobalChatProps {
  opened: boolean;
  messages: GlobalMessage[];
}

export const GlobalChat = ({ opened }: GlobalChatProps) => {
  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const [realtimeMessages, setRealtimeMessages] = React.useState<GlobalMessage[]>([]);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
  });

  const { data: globalMessages = [], isLoading: isLoadingGlobalMessages } = useQuery({
    queryKey: ['global-chat-messages'],
    queryFn: () => GlobalChatService.getAllGlobalMessages(),
  });

  const { mutate: sendGlobalMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: (message: string) => GlobalChatService.sendGlobalMessage(message),
  });

  const allMessages = React.useMemo(() => {
    return [...globalMessages, ...realtimeMessages];
  }, [globalMessages, realtimeMessages]);

  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onReceiveMessage(value: GlobalMessage) {
      setRealtimeMessages((previous) => [...previous, value]);
    }

    socket.on('new_global_message', onReceiveMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('new_global_message', onReceiveMessage);
    };
  }, []);

  const sendMessage = (message: string) => {
    sendGlobalMessage(message);
  };

  const isNearBottom = React.useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return false;
    }

    // Check if user is within 100px of the bottom
    const threshold = 100;
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  const scrollToBottom = React.useCallback(
    (checkForBottom: boolean) => {
      if (checkForBottom && !isNearBottom()) {
        return;
      }

      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [isNearBottom],
  );

  React.useEffect(() => {
    scrollToBottom(true);
  }, [allMessages, scrollToBottom]);

  React.useEffect(() => {
    if (opened) {
      setTimeout(() => {
        scrollToBottom(false);
      }, 10);
    }
  }, [opened, scrollToBottom]);

  return (
    <Portal target="#global-chat-portal">
      <Affix position={{ bottom: 7.5, right: 70 }}>
        <Transition mounted={opened} transition="slide-up" duration={400} timingFunction="ease">
          {(transitionStyles) => (
            <Paper
              shadow="md"
              p="md"
              style={{
                ...transitionStyles,
                height: '500px',
                width: '360px',
                overflow: 'hidden',
                zIndex: 999,
              }}
              withBorder
            >
              <LoadingOverlay
                visible={isLoading || isLoadingGlobalMessages || !isConnected}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 1 }}
              />
              <Stack justify="space-between" style={{ height: '100%' }}>
                <Box ref={messagesContainerRef} style={{ overflowY: 'auto' }}>
                  {allMessages.map((message, index) => (
                    <GlobalChatMessage
                      key={index}
                      message={message}
                      isCurrentUser={message.from?.id === user?.id}
                    />
                  ))}
                  <Box ref={messagesEndRef} />
                </Box>
                <Stack
                  style={{ position: 'sticky', bottom: 0, backgroundColor: 'inherit' }}
                  gap={6}
                >
                  <GlobalChatForm sendMessage={sendMessage} isLoading={isSendingMessage} />
                  <Button
                    onClick={() => scrollToBottom(false)}
                    size="compact-xs"
                    variant="subtle"
                    w="100%"
                  >
                    Scroll to bottom
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Transition>
      </Affix>
    </Portal>
  );
};
