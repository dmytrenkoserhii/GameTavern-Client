import React from 'react';

import { IoIosSend } from 'react-icons/io';

import { Button, Group, TextInput } from '@mantine/core';
import { useField } from '@mantine/form';

interface GlobalChatFormProps {
  sendMessage: (message: string) => void;
  isLoading: boolean;
}

export const GlobalChatForm = ({ sendMessage, isLoading }: GlobalChatFormProps) => {
  const field = useField({
    initialValue: '',
    validate: (value) => (value.trim().length === 0 ? 'Message cannot be empty' : null),
    validateOnBlur: true,
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    field.validate().then((error) => {
      if (error) {
        return;
      }

      sendMessage(field.getValue());
      resetField();
    });
  }

  const resetField = () => {
    field.reset();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Group gap="xs" align="center">
          <TextInput
            style={{ flex: 1 }}
            {...field.getInputProps()}
            placeholder="Type your message"
            disabled={isLoading}
            error={false}
          />
          <Button type="submit" disabled={isLoading || !!field.error} loading={isLoading}>
            <IoIosSend />
          </Button>
        </Group>
      </form>
    </div>
  );
};
