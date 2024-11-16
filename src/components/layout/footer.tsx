import React from 'react';
import dayjs from 'dayjs';
import { Box, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = dayjs().format('YYYY');

  return (
    <Box>
      <Group justify='center'>
        <Text>{t('footer.created_by', { year: currentYear })}</Text>
      </Group>
    </Box>
  );
};
