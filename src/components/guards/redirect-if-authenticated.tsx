import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { Routes } from '@/enums';
import { User, UsersService } from '@/features/user';

import { Spinner } from '../spinner';

export const RedirectIfAuthenticated: React.FC = () => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return user ? <Navigate to={Routes.HOME} replace /> : <Outlet />;
};
