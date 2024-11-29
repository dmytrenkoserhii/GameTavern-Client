import React from 'react';

import { RouteObject } from 'react-router-dom';

import { Protected, RedirectIfAuthenticated, Spinner } from '@/components';
import { Routes } from '@/enums/routes.enum';
import { ChatsLayout } from '@/features/messages';
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
const EmailVerification = React.lazy(
  () => import('@/features/authentication/pages/email-verification-page'),
);
const SubscriptionPage = React.lazy(() => import('@/features/payments/pages/subscription-page'));
const ChatsPage = React.lazy(() => import('@/features/messages/pages/chats-page'));
const ChatPage = React.lazy(() => import('@/features/messages/pages/chat-page'));
const FriendsPage = React.lazy(() => import('@/features/friends/pages/friends-page'));
const FriendPage = React.lazy(() => import('@/features/friends/pages/friend-page'));

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
            element: <div>Games</div>,
          },
          {
            path: `${Routes.GAME}:id`,
            element: <div>Game</div>,
          },
          {
            path: Routes.LISTS,
            element: <div>Lists</div>,
          },
          {
            path: `${Routes.LIST}:id`,
            element: <div>List</div>,
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
                element: (
                  <React.Suspense fallback={<Spinner />}>
                    <FriendsPage />
                  </React.Suspense>
                ),
              },
              {
                path: `${Routes.FRIEND}:id`,
                element: (
                  <React.Suspense fallback={<Spinner />}>
                    <FriendPage />
                  </React.Suspense>
                ),
              },
            ],
          },
          {
            path: Routes.CHATS,
            element: <Protected isPremium />,
            children: [
              {
                path: Routes.CHATS,
                element: (
                  <React.Suspense fallback={<Spinner />}>
                    <ChatsPage />
                  </React.Suspense>
                ),
              },
              {
                element: <ChatsLayout />,
                children: [
                  {
                    path: `${Routes.CHAT}:id`,
                    element: (
                      <React.Suspense fallback={<Spinner />}>
                        <ChatPage />
                      </React.Suspense>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: Routes.GUILD,
            element: <Protected isPremium />,
            children: [
              {
                path: Routes.GUILD,
                element: (
                  <React.Suspense fallback={<Spinner />}>
                    <div>
                      I want to have a guild. It's like a group chat with some advanced features and
                      rewards.
                    </div>
                  </React.Suspense>
                ),
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
        path: Routes.RESET_PASSWORD,
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
      {
        path: Routes.VERIFY_EMAIL,
        element: (
          <React.Suspense fallback={<Spinner />}>
            <EmailVerification />
          </React.Suspense>
        ),
      },
    ],
  },
];
