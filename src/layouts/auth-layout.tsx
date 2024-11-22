import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useQuery } from '@tanstack/react-query';

import { Footer, Header, Navbar } from '@/components';
import { UsersService } from '@/features/user';

export const AuthLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  return (
    <AppShell
      header={{ height: 80 }}
      footer={{ height: 60 }}
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
