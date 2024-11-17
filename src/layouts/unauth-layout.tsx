import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Group } from '@mantine/core';
import { Footer, Header } from '@/components';

export const UnauthLayout: React.FC = () => {
  return (
    <AppShell header={{ height: 80 }} footer={{ height: 60 }} padding='md'>
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Header />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer p='md'>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};
