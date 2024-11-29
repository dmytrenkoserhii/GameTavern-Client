import { FaRegMessage } from 'react-icons/fa6';

import { ActionIcon, Affix, Portal } from '@mantine/core';

interface GlobalChatButtonProps {
  toggleChat: () => void;
}

export const GlobalChatButton = ({ toggleChat }: GlobalChatButtonProps) => {
  return (
    <Portal target="#global-chat-portal">
      <Affix position={{ bottom: 7.5, right: 20 }}>
        <ActionIcon variant="outline" radius="xl" size="xl" onClick={toggleChat}>
          <FaRegMessage size={24} />
        </ActionIcon>
      </Affix>
    </Portal>
  );
};
