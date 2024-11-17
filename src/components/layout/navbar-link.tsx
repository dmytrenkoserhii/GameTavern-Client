import { NavbarLink as INavbarLink } from '@/types';
import { NavLink } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface NavbarLinkProps {
  link: INavbarLink;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ link }) => {
  const { t } = useTranslation();

  return (
    <NavLink
      component={Link}
      to={link.to}
      label={t(link.translationLabel)}
      leftSection={link.icon}
    />
  );
};
