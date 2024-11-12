import { createBrowserRouter } from 'react-router-dom';
import { CLIENT_ROUTES } from './routes/client-routes.constant';

export const router = createBrowserRouter(CLIENT_ROUTES) as ReturnType<
  typeof createBrowserRouter
>;
