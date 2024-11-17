import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient, theme } from '@/lib';
import { router } from '@/router';

export const AppProvider = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
};
