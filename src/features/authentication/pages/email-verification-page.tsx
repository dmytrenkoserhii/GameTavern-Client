import React from 'react';

import { useTranslation } from 'react-i18next';

import { Loader, Stack, Text, Title } from '@mantine/core';

export const EmailVerification: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack align="center" gap="md" w={600} mx="auto" mt="xl">
      <Title order={2} ta="center" mt="md" mb={20}>
        {t('auth.email_verification.title')}
      </Title>
      <Text size="sm" ta="center" mb="xl">
        {t('auth.email_verification.message')}
      </Text>

      <Loader size="xl" />
    </Stack>
  );
};
