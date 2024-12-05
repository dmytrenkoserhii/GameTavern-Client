import { useTranslation } from 'react-i18next';

import { Stack, Tabs } from '@mantine/core';

import { User } from '@/features/user';

import { Friend } from '../types';
import { RejectedRequestsListItem } from './rejected-requests-list-item';

interface RejectedRequestsListProps {
  incomingRejected: Friend[];
  outgoingRejected: Friend[];
  currentUser: User;
  onAccept: (id: number) => void;
  onResend: (id: number) => void;
}

export const RejectedRequestsList = ({
  incomingRejected,
  outgoingRejected,
  currentUser,
  onAccept,
  onResend,
}: RejectedRequestsListProps) => {
  const { t } = useTranslation();

  return (
    <Tabs orientation="vertical" defaultValue="incoming">
      <Tabs.List mr="md">
        <Tabs.Tab value="incoming" color="red">
          {t('friends.rejected.incoming')} ({incomingRejected.length})
        </Tabs.Tab>
        <Tabs.Tab value="outgoing" color="red">
          {t('friends.rejected.outgoing')} ({outgoingRejected.length})
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="incoming">
        <Stack>
          {incomingRejected.map((friend) => (
            <RejectedRequestsListItem
              key={friend.id}
              friend={friend}
              currentUser={currentUser}
              onAccept={onAccept}
              onResend={onResend}
            />
          ))}
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="outgoing">
        <Stack>
          {outgoingRejected.map((friend) => (
            <RejectedRequestsListItem
              key={friend.id}
              friend={friend}
              currentUser={currentUser}
              onAccept={onAccept}
              onResend={onResend}
            />
          ))}
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
};
