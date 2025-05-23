import React from 'react';

import { RouteObject } from 'react-router-dom';

import { Protected, RedirectIfAuthenticated, Spinner } from '@/components';
import { Routes } from '@/enums/routes.enum';
import { AuthLayout, UnauthLayout } from '@/layouts';
import { NotFoundPage } from '@/pages';

const HomePage = React.lazy(() => import('@/pages/home-page'));
const SignInPage = React.lazy(() => import('@/features/authentication/pages/sign-in-page'));
const SignUpPage = React.lazy(() => import('@/features/authentication/pages/sign-up-page'));
const ForgotPasswordPage = React.lazy(
  () => import('@/features/authentication/pages/forgot-password-page'),
);
const ResetPasswordPage = React.lazy(
  () => import('@/features/authentication/pages/reset-password-page'),
);
const EmailConfirmation = React.lazy(
  () => import('@/features/authentication/pages/email-confirmation-page'),
);
const SubscriptionPage = React.lazy(() => import('@/features/payments/pages/subscription-page'));
const ListsPage = React.lazy(() => import('@/features/lists/pages/lists-page'));
const ListPage = React.lazy(() => import('@/features/lists/pages/list-page'));
const GamesPage = React.lazy(() => import('@/features/games-api/pages/games-page'));
const GamePage = React.lazy(() => import('@/features/games-api/pages/game-page'));

export const CLIENT_ROUTES: RouteObject[] = [
  {
    element: <Protected />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: Routes.GAMES,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <GamesPage />
              </React.Suspense>
            ),
          },
          {
            path: `${Routes.GAME}:id`,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <GamePage />
              </React.Suspense>
            ),
          },
          {
            path: Routes.LISTS,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <ListsPage />
              </React.Suspense>
            ),
          },
          {
            path: `${Routes.LIST}:id`,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <ListPage />
              </React.Suspense>
            ),
          },
          {
            path: Routes.CREATE_LIST,
            element: <div>Create List</div>,
          },
          {
            path: Routes.FRIENDS,
            element: <Protected isPremium />,
            children: [
              {
                path: Routes.FRIENDS,
                element: <div>Friends</div>,
              },
            ],
          },
          {
            path: Routes.MESSAGES,
            element: <Protected isPremium />,
            children: [
              {
                path: Routes.MESSAGES,
                element: <div>Messages</div>,
              },
            ],
          },
          {
            path: Routes.PROFILE,
            element: <div>Profile</div>,
          },
          {
            path: Routes.SETTINGS,
            element: <div>Settings</div>,
          },
          {
            path: Routes.SUBSCRIPTION,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <SubscriptionPage />
              </React.Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <UnauthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: Routes.HOME,
        element: (
          <React.Suspense fallback={<Spinner />}>
            <HomePage />
          </React.Suspense>
        ),
      },
      {
        element: <RedirectIfAuthenticated />,
        children: [
          {
            path: Routes.LOGIN,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <SignInPage />
              </React.Suspense>
            ),
          },
          {
            path: Routes.REGISTER,
            element: (
              <React.Suspense fallback={<Spinner />}>
                <SignUpPage />
              </React.Suspense>
            ),
          },
        ],
      },
      {
        path: Routes.FORGOT_PASSWORD,
        element: (
          <React.Suspense fallback={<Spinner />}>
            <ForgotPasswordPage />
          </React.Suspense>
        ),
      },
      {
        path: `${Routes.RESET_PASSWORD}/:token`,
        element: (
          <React.Suspense fallback={<Spinner />}>
            <ResetPasswordPage />
          </React.Suspense>
        ),
      },
      {
        path: Routes.CONFIRM_EMAIL,
        element: (
          <React.Suspense fallback={<Spinner />}>
            <EmailConfirmation />
          </React.Suspense>
        ),
      },
    ],
  },
];
