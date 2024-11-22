import { Navigate, Outlet } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Routes } from '@/enums';
import { Role } from '@/features/authentication';
import { User, UsersService } from '@/features/user';

import { Spinner } from '../spinner';

export const Protected: React.FC<{ roles?: Role[] }> = ({ roles }) => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to={Routes.LOGIN} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={Routes.HOME} />;
  }

  return <Outlet />;
};
