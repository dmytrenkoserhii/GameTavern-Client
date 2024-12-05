import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Group, Stack, Tabs, Title } from '@mantine/core';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getChatRoute } from '@/enums/routes.enum';
import { UsersService } from '@/features/user';

import { FriendsList, PendingRequestsList, RejectedRequestsList } from '../components';
import { AddNewFriendPopover } from '../components/add-new-friend-popover';
import { FriendsService } from '../services';

const FriendsPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
  });

  const { data: friendsData } = useQuery({
    queryKey: ['friends'],
    queryFn: () => FriendsService.getFriendsList(),
  });

  const { data: incomingRequestsData } = useQuery({
    queryKey: ['friends', 'pending', 'incoming'],
    queryFn: () => FriendsService.getPendingIncomingRequests(),
  });

  const { data: outgoingRequestsData } = useQuery({
    queryKey: ['friends', 'pending', 'outgoing'],
    queryFn: () => FriendsService.getPendingOutgoingRequests(),
  });

  const { data: rejectedIncomingRequestsData } = useQuery({
    queryKey: ['friends', 'rejected', 'incoming'],
    queryFn: () => FriendsService.getRejectedIncomingRequests(),
  });

  const { data: rejectedOutgoingRequestsData } = useQuery({
    queryKey: ['friends', 'rejected', 'outgoing'],
    queryFn: () => FriendsService.getRejectedOutgoingRequests(),
  });

  const { mutate: acceptIncomingRequest } = useMutation({
    mutationFn: (id: number) => FriendsService.acceptFriendRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const { mutate: rejectIncomingRequest } = useMutation({
    mutationFn: (id: number) => FriendsService.rejectFriendRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const { mutate: deleteFriend } = useMutation({
    mutationFn: (id: number) => FriendsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const { mutate: resendFriendRequest } = useMutation({
    mutationFn: (id: number) => FriendsService.resendFriendRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const onFriendDelete = (id: number) => {
    deleteFriend(id);
  };

  const onFriendMessage = (id: number) => {
    navigate(getChatRoute(id));
  };

  const onIncomingAccept = (id: number) => {
    acceptIncomingRequest(id);
  };

  const onIncomingReject = (id: number) => {
    rejectIncomingRequest(id);
  };

  const onOutgoingDelete = (id: number) => {
    deleteFriend(id);
  };

  const onRejectedAccept = (id: number) => {
    acceptIncomingRequest(id);
  };

  const onRejectedResend = (id: number) => {
    resendFriendRequest(id);
  };

  if (!userData) {
    return null;
  }

  return (
    <Stack>
      <Group>
        <Title order={2}>{t('friends.title')}</Title>
        <AddNewFriendPopover />
      </Group>

      <Tabs color="primary" defaultValue="friends">
        <Tabs.List mb="md" grow>
          <Tabs.Tab value="friends" color="primary">
            {t('friends.friends')} ({friendsData?.items?.length ?? 0})
          </Tabs.Tab>
          <Tabs.Tab value="pending" color="blue">
            {t('friends.pending')} ({incomingRequestsData?.items?.length ?? 0})
          </Tabs.Tab>
          <Tabs.Tab value="rejected" color="red">
            {t('friends.rejected')} ({rejectedIncomingRequestsData?.items?.length ?? 0})
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="friends">
          <FriendsList
            friends={friendsData?.items ?? []}
            currentUser={userData}
            onDelete={onFriendDelete}
            onMessage={onFriendMessage}
          />
        </Tabs.Panel>

        <Tabs.Panel value="pending">
          <PendingRequestsList
            incomingRequests={incomingRequestsData?.items ?? []}
            outgoingRequests={outgoingRequestsData?.items ?? []}
            currentUser={userData}
            onAcceptIncoming={onIncomingAccept}
            onRejectIncoming={onIncomingReject}
            onDeleteOutgoing={onOutgoingDelete}
          />
        </Tabs.Panel>

        <Tabs.Panel value="rejected">
          <RejectedRequestsList
            incomingRejected={rejectedIncomingRequestsData?.items ?? []}
            outgoingRejected={rejectedOutgoingRequestsData?.items ?? []}
            currentUser={userData}
            onAccept={onRejectedAccept}
            onResend={onRejectedResend}
          />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default FriendsPage;
