import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  Affix,
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Portal,
  Stack,
  Title,
  Transition,
} from '@mantine/core';

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

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
  const { t } = useTranslation();

  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const [realtimeMessages, setRealtimeMessages] = React.useState<GlobalMessage[]>([]);
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
  });

  const {
    data: globalMessagesData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['global-chat-messages'],
    queryFn: ({ pageParam = 1 }) => GlobalChatService.getAllGlobalMessages(10, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? Number(lastPage.meta.currentPage) + 1 : undefined,
    initialPageParam: 1,
  });

  const { mutate: sendGlobalMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: (message: string) => GlobalChatService.sendGlobalMessage(message),
  });

  const loadMoreMessages = React.useCallback(async () => {
    if (isFetchingNextPage) {
      return;
    }
    await fetchNextPage();
  }, [fetchNextPage, isFetchingNextPage]);

  const handleScroll = React.useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container || isFetchingNextPage) {
      return;
    }

    // Load more when user scrolls to top (within 100px)
    if (container.scrollTop < 100) {
      loadMoreMessages();
    }
  }, [loadMoreMessages, isFetchingNextPage]);

  React.useEffect(() => {
    if (!opened) {
      return;
    }

    let container: HTMLDivElement | null = null;

    // Small timeout to ensure DOM is rendered
    const timeoutId = setTimeout(() => {
      container = messagesContainerRef.current;
      if (!container) {
        return;
      }

      container.addEventListener('scroll', handleScroll);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up listener using the captured container reference
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, opened]);

  const allMessages = React.useMemo(() => {
    if (!globalMessagesData) {
      return [];
    }

    // Combine all pages and flatten them
    const historicalMessages = globalMessagesData.pages.flatMap((page) => page.items).reverse(); // Reverse because backend sends DESC order

    return [...historicalMessages, ...realtimeMessages];
  }, [globalMessagesData, realtimeMessages]);

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
      <Affix position={{ bottom: isFullscreen ? 0 : 7.5, right: isFullscreen ? 0 : 70 }}>
        <Transition mounted={opened} transition="slide-up" duration={400} timingFunction="ease">
          {(transitionStyles) => (
            <Paper
              shadow="md"
              p="md"
              style={{
                ...transitionStyles,
                height: isFullscreen ? '100vh' : '600px',
                width: isFullscreen ? '100vw' : '400px',
                overflow: 'hidden',
                zIndex: 999,
              }}
              withBorder
            >
              <LoadingOverlay
                visible={isLoading || isFetchingNextPage || !isConnected}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 1 }}
              />

              <Stack justify="space-between" style={{ height: '100%' }}>
                <Title order={3} style={{ textAlign: 'center' }}>
                  {t('global_chat.title')}
                </Title>

                <Paper
                  ref={messagesContainerRef}
                  withBorder
                  shadow="none"
                  p="xs"
                  style={{
                    overflowY: isFetchingNextPage ? 'hidden' : 'auto',
                  }}
                >
                  {allMessages.map((message, index) => (
                    <GlobalChatMessage
                      key={message.id || index}
                      message={message}
                      isCurrentUser={message.from?.id === user?.id}
                      isFullscreen={isFullscreen}
                    />
                  ))}
                  <Box ref={messagesEndRef} />
                </Paper>

                <Stack
                  style={{ position: 'sticky', bottom: 0, backgroundColor: 'inherit' }}
                  gap={6}
                >
                  <GlobalChatForm sendMessage={sendMessage} isLoading={isSendingMessage} />
                  <Group gap={6} wrap="nowrap">
                    <Button
                      onClick={() => scrollToBottom(false)}
                      size="compact-xs"
                      variant="subtle"
                      w="50%"
                    >
                      {t('global_chat.scroll_to_bottom')}
                    </Button>
                    <Button
                      onClick={() => setIsFullscreen((prev) => !prev)}
                      size="compact-xs"
                      variant="subtle"
                      w="50%"
                      color={isFullscreen ? 'secondary' : 'primary'}
                    >
                      {isFullscreen
                        ? t('global_chat.exit_fullscreen')
                        : t('global_chat.fullscreen')}
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Paper>
          )}
        </Transition>
      </Affix>
    </Portal>
  );
};
