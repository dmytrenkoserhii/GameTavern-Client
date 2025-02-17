import i18next from 'i18next';

import React from 'react';

import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/lib/i18n';

const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <I18nextProvider i18n={i18next}>
            <Story />
          </I18nextProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
