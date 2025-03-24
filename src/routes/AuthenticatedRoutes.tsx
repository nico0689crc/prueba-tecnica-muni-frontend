import { lazy } from 'react';

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Loadable from '@/ui-component/Loadable';
import AuthGuard from '@/routes/route-guard/AuthGuard';
import RoleGuard from '@/routes/route-guard/RoleGuard';
import NoAutorizadoPage from '@/views/common/NoAutorizado/NoAutorizadoPage';

const Inicio = Loadable(lazy(() => import('@/views/authenticated/Inicio/InicioPage')));
const Tareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/TareasPage')));
const Usuarios = Loadable(lazy(() => import('@/views/authenticated/Usuarios/UsuariosPage')));

const AuthenticatedRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <AuthenticatedLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/inicio',
      element: <Inicio />
    },
    {
      path: '/tareas',
      element: <Tareas />
    },
    {
      path: '/usuarios',
      element: (
        <RoleGuard requiredRole='admin'>
          <Usuarios />
        </RoleGuard>
      )
    },
    {
      path: '/no-autorizado',
      element: <NoAutorizadoPage />
    }
  ]
};

export default AuthenticatedRoutes;
