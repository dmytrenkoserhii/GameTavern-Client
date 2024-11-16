import { NAVBAR_LINKS } from '@/constants';
import { Button, Stack } from '@mantine/core';
import { NavbarLink } from './navbar-link';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack justify='space-between' h='100%'>
      <Stack gap='md'>
        {NAVBAR_LINKS.map((link) => (
          <NavbarLink key={link.to} link={link} />
        ))}
      </Stack>

      <Stack>
        <Button color='orange'>{t('navbar.premium')}</Button>
        <Button>{t('navbar.logout')}</Button>
      </Stack>
    </Stack>
  );
};
