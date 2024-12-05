import { useTranslation } from 'react-i18next';

import { Stack, Tabs } from '@mantine/core';

import { User } from '@/features/user';

import { Friend } from '../types';
import { PendingRequestsListItem } from './pending-requests-list-item';

interface PendingRequestsListProps {
  incomingRequests: Friend[];
  outgoingRequests: Friend[];
  currentUser: User;
  onAcceptIncoming: (id: number) => void;
  onRejectIncoming: (id: number) => void;
  onDeleteOutgoing: (id: number) => void;
}

export const PendingRequestsList = ({
  incomingRequests,
  outgoingRequests,
  currentUser,
  onAcceptIncoming,
  onRejectIncoming,
  onDeleteOutgoing,
}: PendingRequestsListProps) => {
  const { t } = useTranslation();

  return (
    <Tabs orientation="vertical" defaultValue="incoming">
      <Tabs.List mr="md">
        <Tabs.Tab value="incoming">
          {t('friends.pending.incoming')} ({incomingRequests.length})
        </Tabs.Tab>
        <Tabs.Tab value="outgoing">
          {t('friends.pending.outgoing')} ({outgoingRequests.length})
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="incoming">
        <Stack>
          {incomingRequests.map((friend) => (
            <PendingRequestsListItem
              key={friend.id}
              friend={friend}
              onAcceptIncoming={onAcceptIncoming}
              onRejectIncoming={onRejectIncoming}
              onDeleteOutgoing={onDeleteOutgoing}
              currentUser={currentUser}
            />
          ))}
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="outgoing">
        <Stack>
          {outgoingRequests.map((friend) => (
            <PendingRequestsListItem
              key={friend.id}
              friend={friend}
              onAcceptIncoming={onAcceptIncoming}
              onRejectIncoming={onRejectIncoming}
              onDeleteOutgoing={onDeleteOutgoing}
              currentUser={currentUser}
            />
          ))}
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
};
