import { Center } from '@mantine/core';

import { useMutation, useQuery } from '@tanstack/react-query';

import { User, UsersService } from '@/features/user';

import { PaymentCard } from '../components';
import { PaymentsService } from '../services';

const SubscriptionPage: React.FC = () => {
  const { data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const { mutate: purchaseProduct, status } = useMutation({
    mutationFn: ({ productId, userId }: { productId: string; userId: string }) =>
      PaymentsService.purchaseProduct(productId, userId),
    onSuccess: (checkoutUrl: string) => {
      window.open(checkoutUrl, '_blank');
    },
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error('Purchase failed:', error.message);
    },
  });

  const onPaymentClick = () => {
    const productId = import.meta.env.VITE_LEMON_SQUEEZY_PRODUCT_ID;
    if (!user) {
      // eslint-disable-next-line no-console
      console.error('User not found');
      return;
    }

    if (!productId) {
      // eslint-disable-next-line no-console
      console.error('Product ID not found');
      return;
    }

    purchaseProduct({
      productId,
      userId: user.id.toString(),
    });
  };

  const isLoading = status === 'pending';

  if (!user) {
    return null;
  }

  return (
    <Center>
      <PaymentCard user={user} onPaymentClick={onPaymentClick} isLoading={isLoading} />
    </Center>
  );
};

export default SubscriptionPage;
