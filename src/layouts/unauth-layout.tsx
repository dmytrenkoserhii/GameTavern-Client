import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppShell, Group } from '@mantine/core';

import { useQuery } from '@tanstack/react-query';

import { Footer, Header } from '@/components';
import { UsersService } from '@/features/users';

export const UnauthLayout: React.FC = () => {
  useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  return (
    <AppShell header={{ height: 80 }} footer={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p="md">
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
