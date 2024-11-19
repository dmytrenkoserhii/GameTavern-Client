import React from 'react';

import { useTranslation } from 'react-i18next';

import { Stack, Text, Title } from '@mantine/core';

export const EmailConfirmation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack align="center" gap="md" w={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mt="md" mb={20}>
        {t('auth.email_confirmation.title')}
      </Title>

      <Text c="dimmed" size="sm" ta="center" mb="xl">
        {t('auth.email_confirmation.description', { email: 'dmtrnk.srg@gmail.com' })}
      </Text>
    </Stack>
  );
};
