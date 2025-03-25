import { lazy } from 'react';

import GuestGuard from './route-guard/GuestGuard';
import GuestLayout from '@/layouts/GuestLayout';
import Loadable from '@/ui-component/Loadable';

const AuthLogin = Loadable(lazy(() => import('@/views/guest/Login/LoginPage')));

const LoginRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <GuestLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/login',
      element: <AuthLogin />
    },
  ]
};

export default LoginRoutes;
