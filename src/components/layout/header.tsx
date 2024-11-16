import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  TextInput,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { UserIcon } from '../user-icon';
import { Routes } from '@/enums/routes.enum';
import logo from '@/assets/logo.png';
import { LanguageSelector } from '../language-selector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const user = true;

  let headerContent: React.ReactNode;
  if (user) {
    headerContent = (
      <Group flex={1} justify='space-between' ml='xl'>
        <Group flex={1}>
          <Anchor
            component={Link}
            to={Routes.GAMES}
            underline='never'
            c='inherit'
            size='lg'
          >
            {t('header.games_link')}
          </Anchor>
        </Group>

        <TextInput placeholder={t('header.search')} />

        <UserIcon />
      </Group>
    );
  } else {
    headerContent = (
      <Group>
        <Button>{t('general.sign_in')}</Button>
      </Group>
    );
  }

  return (
    <Box>
      <Center>
        <Container component='main' maw='80rem' w='100%' px={0} m='0 auto'>
          <Group justify='space-between' px='md' py='sm' wrap='nowrap'>
            <Group>
              <Link to={Routes.HOME}>
                <img height={50} src={logo} alt='logo' />
              </Link>
            </Group>

            {headerContent}

            <LanguageSelector />
          </Group>
        </Container>
      </Center>
      <Divider />
    </Box>
  );
};
