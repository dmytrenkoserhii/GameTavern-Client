import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib';

export const AppProvider = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
};
