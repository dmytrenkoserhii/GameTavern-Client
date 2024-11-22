import { Center } from '@mantine/core';

import { User } from '@/features/authentication';

import { PaymentCard } from '../components';

const SubscriptionPage: React.FC = () => {
  return (
    <Center>
      <PaymentCard user={{ isPremium: false, id: 1 } as User} />
    </Center>
  );
};

export default SubscriptionPage;
