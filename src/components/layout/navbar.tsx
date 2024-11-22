import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button, Stack } from '@mantine/core';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NAVBAR_LINKS } from '@/constants';
import { Routes } from '@/enums';
import { AuthService } from '@/features/authentication';

import { NavbarLink } from './navbar-link';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate(Routes.LOGIN);
    },
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <Stack justify="space-between" h="100%">
      <Stack gap="md">
        {NAVBAR_LINKS.map((link) => (
          <NavbarLink key={link.to} link={link} />
        ))}
      </Stack>

      <Stack>
        <Button color="tertiary">{t('navbar.premium')}</Button>
        <Button onClick={handleLogout} variant="outline">
          {t('navbar.logout')}
        </Button>
      </Stack>
    </Stack>
  );
};
