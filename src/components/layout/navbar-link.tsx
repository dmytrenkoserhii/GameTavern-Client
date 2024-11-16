import { NavbarLink as INavbarLink } from '@/types';
import { Anchor } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface NavbarLinkProps {
  link: INavbarLink;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ link }) => {
  const { t } = useTranslation();

  return (
    <Anchor
      component={Link}
      to={link.to}
      underline='never'
      c='inherit'
      size='lg'
    >
      {t(link.translationLabel)}
    </Anchor>
  );
};
