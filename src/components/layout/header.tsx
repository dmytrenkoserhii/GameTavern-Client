import { Button, Group, TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
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
        <TextInput placeholder={t('header.search')} />
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
    <Group justify='space-between' px='md' py='sm' wrap='nowrap' flex={1}>
      <Link to={Routes.HOME}>
        <img height={50} src={logo} alt='logo' />
      </Link>

      <Group>
        {headerContent}

        <LanguageSelector />
      </Group>
    </Group>
  );
};
