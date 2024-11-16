import { Routes } from '@/enums/routes.enum';
import { Menu, ActionIcon } from '@mantine/core';
import { t } from 'i18next';
import { RiUserLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const UserIcon: React.FC = () => {
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <ActionIcon variant='subtle' size='lg'>
          <RiUserLine size={22} />{' '}
        </ActionIcon>
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
