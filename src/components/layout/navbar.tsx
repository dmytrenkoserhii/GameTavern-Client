import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Stack } from '@mantine/core';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { NAVBAR_LINKS } from '@/constants';
import { QueryKeys, Routes } from '@/enums';
import { AuthService } from '@/features/authentication';
import { User, UsersService } from '@/features/user';

import { CrownIcon } from '../icons/crown-icon';
import { NavbarLink } from './navbar-link';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: [QueryKeys.USER],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.setQueryData([QueryKeys.USER], null);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
      navigate(Routes.LOGIN);
    },
    onError: (error: Error) => {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
    },
  });

  const handlePremiumClick = () => {
    navigate(Routes.SUBSCRIPTION);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Stack justify="space-between" h="100%">
      <Stack gap="md">
        {NAVBAR_LINKS.map((link) => (
          <NavbarLink key={link.to} link={link} user={user} />
        ))}
      </Stack>

      <Stack>
        {!user?.isPremium && (
          <Button onClick={handlePremiumClick} variant="outline">
            {t('navbar.premium')}
          </Button>
        )}
        <Box pos="relative">
          <Button onClick={handleLogout} variant="outline" w="100%">
            {t('navbar.logout')}
          </Button>
          {user?.isPremium && (
            <CrownIcon
              color="var(--mantine-color-tertiary-filled)"
              size={32}
              style={{
                position: 'absolute',
                top: -20,
                right: -15,
                transform: 'rotate(30deg)',
              }}
            />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
