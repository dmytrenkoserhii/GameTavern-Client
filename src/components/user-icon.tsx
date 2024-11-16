import { Routes } from '@/enums/routes.enum';
import { Menu } from '@mantine/core';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import userIcon from '@/assets/user.png';

export const UserIcon: React.FC = () => {
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <img
          height={60}
          src={userIcon}
          alt='user'
          style={{ cursor: 'pointer' }}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item component={Link} to={Routes.PROFILE}>
          {t('header.profile')}
        </Menu.Item>
        <Menu.Item color='red'>{t('header.logout')}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
