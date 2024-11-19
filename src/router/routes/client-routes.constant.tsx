import { RouteObject } from 'react-router-dom';

import { Routes } from '@/enums/routes.enum';
import {
  ForgotPasswordPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
} from '@/features/authentication';
import { AuthLayout, UnauthLayout } from '@/layouts';
import { HomePage, NotFoundPage } from '@/pages';

export const CLIENT_ROUTES: RouteObject[] = [
  {
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
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
        element: <div>Friends</div>,
      },
      {
        path: Routes.MESSAGES,
        element: <div>Messages</div>,
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
        element: <div>Subscription</div>,
      },
      {
        path: Routes.CONFIRM_EMAIL,
        element: <div>Confirm Email</div>,
      },
    ],
  },
  {
    element: <UnauthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: Routes.HOME,
        element: <HomePage />,
      },
      {
        path: Routes.LOGIN,
        element: <SignInPage />,
      },
      {
        path: Routes.REGISTER,
        element: <SignUpPage />,
      },
      {
        path: Routes.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: Routes.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
    ],
  },
];
