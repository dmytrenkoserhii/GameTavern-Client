import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { NavLink } from '@mantine/core';

import { NavbarLink as INavbarLink } from '@/types';

interface NavbarLinkProps {
  link: INavbarLink;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ link }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = location.pathname.startsWith(link.to);

  return (
    <NavLink
      component={Link}
      to={link.to}
      label={t(link.translationLabel)}
      leftSection={link.icon}
      active={isActive}
      color='primary'
    />
  );
};
