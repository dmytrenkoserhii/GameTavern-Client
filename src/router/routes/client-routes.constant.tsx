import { AuthLayout, UnauthLayout } from '@/layouts';
import { HomePage, NotFoundPage } from '@/pages';
import { RouteObject } from 'react-router-dom';
import { Routes } from '@/enums/routes.enum';
import { SignInPage } from '@/features/authentication';

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
        path: `${Routes.GAME}/:id`,
        element: <div>Game</div>,
      },
      {
        path: Routes.PROFILE,
        element: <div>Profile</div>,
      },
      {
        path: Routes.LISTS,
        element: <div>Lists</div>,
      },
      {
        path: `${Routes.LIST}/:id`,
        element: <div>List</div>,
      },
      {
        path: Routes.CREATE_LIST,
        element: <div>Create List</div>,
      },
      {
        path: Routes.CONFIRM_EMAIL,
        element: <div>Confirm Email</div>,
      },
      {
        path: Routes.FORGOT_PASSWORD,
        element: <div>Forgot Password</div>,
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
        element: <div>Register</div>,
      },
    ],
  },
];
