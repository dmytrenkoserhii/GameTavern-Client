import { Navigate, Outlet } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Routes } from '@/enums';
import { Role, User, UsersService } from '@/features/user';

import { Spinner } from '../spinner';

interface ProtectedProps {
  roles?: Role[];
  isPremium?: boolean;
}

export const Protected: React.FC<ProtectedProps> = ({ roles, isPremium }) => {
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

  if (isPremium && !user.isPremium) {
    return <Navigate to={Routes.SUBSCRIPTION} />;
  }

  return <Outlet />;
};
