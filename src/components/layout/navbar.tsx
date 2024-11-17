import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mantine/core';

import { NAVBAR_LINKS } from '@/constants';

import { NavbarLink } from './navbar-link';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack justify="space-between" h="100%">
      <Stack gap="md">
        {NAVBAR_LINKS.map((link) => (
          <NavbarLink key={link.to} link={link} />
        ))}
      </Stack>

      <Stack>
        <Button color="tertiary">{t('navbar.premium')}</Button>
        <Button variant="outline">{t('navbar.logout')}</Button>
      </Stack>
    </Stack>
  );
};
