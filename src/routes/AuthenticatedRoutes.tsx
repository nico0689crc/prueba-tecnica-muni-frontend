import { lazy } from 'react';

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Loadable from '@/ui-component/Loadable';
import AuthGuard from '@/routes/route-guard/AuthGuard';
import RoleGuard from '@/routes/route-guard/RoleGuard';

const Inicio = Loadable(lazy(() => import('@/views/authenticated/Inicio/InicioPage')));
const Tareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/TareasPage')));
const EditarTareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/EditarTareasPage')));
const Usuarios = Loadable(lazy(() => import('@/views/authenticated/Usuarios/UsuariosPage')));
const NoAutorizadoPage = Loadable(lazy(() => import('@/views/common/NoAutorizado/NoAutorizadoPage')));
const NoEncontradoPage = Loadable(lazy(() => import('@/views/common/NoEncontrado/NoEncontradoPage')));

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
      path: '/tareas/:id/editar',
      element: <EditarTareas />
    },
    {
      path: '/tareas',
      element: <Tareas />,
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
    },
    {
      path: '/no-encontrado',
      element: <NoEncontradoPage />
    }
  ]
};

export default AuthenticatedRoutes;
