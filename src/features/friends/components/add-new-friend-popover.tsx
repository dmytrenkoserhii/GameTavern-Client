import { useTranslation } from 'react-i18next';
import { BsPlus } from 'react-icons/bs';

import { Button, Popover, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FriendsService } from '../services/friends.service';

export const AddNewFriendPopover = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const sendFriendRequest = useMutation({
    mutationFn: FriendsService.sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
      form.reset();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  });

  const form = useForm({
    initialValues: {
      friendId: '',
    },
    validate: {
      friendId: (value) => (value.trim().length < 2 ? 'Friend ID is too short' : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    sendFriendRequest.mutate({ email: values.friendId });
  });

  return (
    <Popover width={400} position="bottom" withArrow shadow="md" trapFocus>
      <Popover.Target>
        <Button variant="outline" leftSection={<BsPlus size={24} />} size="xs">
          {t('friends.add_friend')}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <form onSubmit={handleSubmit}>
          <TextInput
            {...form.getInputProps('friendId')}
            placeholder="Friend email/username"
            mb="sm"
            disabled={sendFriendRequest.isPending}
          />
          <Button type="submit" fullWidth loading={sendFriendRequest.isPending}>
            {t('friends.add_friend')}
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
