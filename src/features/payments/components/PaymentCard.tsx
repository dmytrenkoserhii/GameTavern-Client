import { Button, Card, Group, Stack, Text } from '@mantine/core';

import { useMutation } from '@tanstack/react-query';

import { User } from '@/features/authentication';

import { PREMIUM_OPTIONS } from '../constants';
import { PaymentsService } from '../services';

interface PaymentCardProps {
  user: User;
}

export function PaymentCard({ user }: PaymentCardProps) {
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

  const payForPremium = () => {
    if (!user) {
      return;
    }

    purchaseProduct({ productId: '417679', userId: user.id.toString() });
  };

  const isLoading = status === 'pending';

  return (
    <Card
      w={380}
      ta="center"
      mt="lg"
      bg={user.isPremium ? 'var(--mantine-color-gray-1)' : undefined}
      withBorder={user.isPremium}
    >
      <Stack gap="md">
        <div>
          <Text fw={700} size="xl">
            Buy Premium
          </Text>
          <Text c="dimmed" size="sm">
            Get access to all features and premium content.
          </Text>
        </div>

        <Stack gap="xs">
          {PREMIUM_OPTIONS.map((option, index) => (
            <Group key={index} gap="xs">
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--mantine-color-blue-filled)',
                }}
              />
              <Text size="sm">{option}</Text>
            </Group>
          ))}
        </Stack>

        {user.isPremium ? (
          <Text c="blue" fw={500}>
            You already have premium access
          </Text>
        ) : (
          <Button
            color="tertiary"
            fullWidth
            onClick={payForPremium}
            disabled={isLoading}
            loading={isLoading}
          >
            Buy
          </Button>
        )}
      </Stack>
    </Card>
  );
}
