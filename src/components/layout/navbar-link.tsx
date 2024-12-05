import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Indicator, NavLink } from '@mantine/core';

import { User } from '@/features/user';
import { NavbarLink as INavbarLink } from '@/types';

import { CrownIcon } from '../icons/crown-icon';

interface NavbarLinkProps {
  link: INavbarLink;
  user?: User;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({ link, user }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = location.pathname.startsWith(link.to);

  const rightSection =
    link.isPremium && !user?.isPremium ? (
      <CrownIcon color="var(--mantine-color-tertiary-filled)" size={24} />
    ) : null;

  return (
    <Indicator
      label={link.highlightLabel}
      size={link.highlightType === 'label' ? 16 : 10}
      color="secondary"
      position="middle-end"
      offset={20}
      disabled={!link.highlight}
      processing
    >
      <NavLink
        component={Link}
        to={link.to}
        label={t(link.translationLabel)}
        leftSection={link.icon}
        rightSection={rightSection}
        active={isActive}
        color="primary"
        style={{
          color:
            link.isPremium && !user?.isPremium ? 'var(--mantine-color-tertiary-filled)' : undefined,
        }}
      />
    </Indicator>
  );
};
