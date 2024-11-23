import { Button, Card, Group, LoadingOverlay, Overlay, Stack, Text } from '@mantine/core';

import { User } from '@/features/user';

import { PREMIUM_OPTIONS } from '../constants';

interface PaymentCardProps {
  user: User;
  onPaymentClick: () => void;
  isLoading: boolean;
}

export function PaymentCard({ user, onPaymentClick, isLoading }: PaymentCardProps) {
  return (
    <Card w={380} ta="center" mt="lg" withBorder={user.isPremium}>
      {user.isPremium && <Overlay color="#000" backgroundOpacity={0.35} blur={2} />}
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Stack gap="md">
        <div>
          <Text fw={700} size="xl">
            Subscribe to Premium
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
                  backgroundColor: 'var(--mantine-color-primary-filled)',
                }}
              />
              <Text size="sm">{option}</Text>
            </Group>
          ))}
        </Stack>

        {user.isPremium ? (
          <Text fw={500} c="tertiary" style={{ position: 'relative', zIndex: 9999 }}>
            You already have premium access
          </Text>
        ) : (
          <Button color="tertiary" fullWidth onClick={onPaymentClick} disabled={isLoading}>
            Buy
          </Button>
        )}
      </Stack>
    </Card>
  );
}
