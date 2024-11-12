import { Home } from '@/pages';
import { RouteObject } from 'react-router-dom';

export const CLIENT_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
];
