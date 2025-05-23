import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Button, Center, Title } from '@mantine/core';

// TODO: it's potentially a bad idea to have this page outside of the layout
export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Center h="100vh">
      <Box>
        <Title>{t('not_found.text')}</Title>
        <Button component={Link} to="/" fullWidth variant="light" color="cyan">
          {t('not_found.home_page')}
        </Button>
      </Box>
    </Center>
  );
};
