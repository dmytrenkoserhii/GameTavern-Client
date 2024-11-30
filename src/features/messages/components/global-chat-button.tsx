import { FaRegMessage } from 'react-icons/fa6';

import { ActionIcon, Affix, Indicator, Portal } from '@mantine/core';

interface GlobalChatButtonProps {
  toggleChat: () => void;
  isOpen: boolean;
  hasNewMessages: boolean;
}

export const GlobalChatButton = ({ toggleChat, isOpen, hasNewMessages }: GlobalChatButtonProps) => {
  return (
    <Portal target="#global-chat-portal">
      <Affix position={{ bottom: 7.5, right: 20 }}>
        <Indicator
          color="secondary"
          size={12}
          processing
          offset={6}
          disabled={isOpen || !hasNewMessages}
        >
          <ActionIcon variant="outline" radius="xl" size="xl" onClick={toggleChat}>
            <FaRegMessage size={24} />
          </ActionIcon>
        </Indicator>
      </Affix>
    </Portal>
  );
};
