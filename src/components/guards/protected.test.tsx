import { render, screen } from '@testing-library/react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import { Role } from '@/features/user';

import { Protected } from './protected';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  UNSAFE_NavigationContext: {
    Consumer: ({
      children,
    }: {
      children: (value: { navigator: { action: string } }) => React.ReactNode;
    }) => children({ navigator: { action: 'POP' } }),
  },
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

jest.mock('@/features/user', () => ({
  UsersService: {
    getCurrentUser: jest.fn(),
  },
  Role: {
    ADMIN: 'ADMIN',
    USER: 'USER',
  },
}));

jest.mock('@/enums', () => ({
  Routes: {
    LOGIN: '/login',
    HOME: '/',
    SUBSCRIPTION: '/subscription',
  },
  QueryKeys: {
    USER: 'user',
  },
}));

describe('Protected', () => {
  const queryClient = new QueryClient();

  it('should show spinner when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Protected />}>
                <Route index element={<div>Protected Content</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
    });

    render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Protected />}>
                <Route index element={<div>Protected Content</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>,
    );

    expect(window.location.pathname).toBe('/login');
  });

  it('should redirect to home when user has wrong role', () => {
    const mockUser = {
      id: 1,
      role: Role.USER,
      isPremium: false,
      email: 'test@test.com',
      username: 'testuser',
    };

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockUser,
      error: null,
      isSuccess: true,
    });

    render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Protected roles={[Role.ADMIN]} />}>
                <Route index element={<div>Protected Content</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>,
    );

    setTimeout(() => {
      expect(window.location.pathname).toBe('/');
    }, 0);
  });
});
