import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button, Group, Image, TextInput } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import logo from '@/assets/logo.png';
import { Routes } from '@/enums/routes.enum';

import { LanguageSelector } from '../language-selector';
import { ThemeSelector } from '../theme-selector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { data: user } = useQuery({ queryKey: ['user'] });

  let headerContent: React.ReactNode;
  if (user) {
    headerContent = (
      <Group flex={1} justify="space-between" ml="xl">
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
    <Group justify="space-between" py="sm" wrap="nowrap" flex={1}>
      <Link to={Routes.HOME}>
        <Image height={50} src={logo} alt="logo" />
      </Link>

      <Group>
        {headerContent}

        <LanguageSelector />
        <ThemeSelector />
      </Group>
    </Group>
  );
};
