import { lazy } from 'react';

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Loadable from '@/ui-component/Loadable';
import AuthGuard from '@/routes/route-guard/AuthGuard';
import RoleGuard from '@/routes/route-guard/RoleGuard';

const Inicio = Loadable(lazy(() => import('@/views/authenticated/Inicio/InicioPage')));
const Tareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/TareasPage')));
const AgregarTareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/AgregarTareasPage')));
const EditarTareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/EditarTareasPage')));
const NoAutorizadoPage = Loadable(lazy(() => import('@/views/common/NoAutorizado/NoAutorizadoPage')));
const NoEncontradoPage = Loadable(lazy(() => import('@/views/common/NoEncontrado/NoEncontradoPage')));
const Trabajando = Loadable(lazy(() => import('@/views/common/Trabajando/TrabajandoPage')));

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
      path: '/tareas/agregar',
      element: (
        <RoleGuard requiredRole='admin'>
          <AgregarTareas />
        </RoleGuard>
      )
    },
    {
      path: '/tareas',
      element: <Tareas />,
    },
    {
      path: '/usuarios',
      element: (
        <RoleGuard requiredRole='admin'>
          <Trabajando />
        </RoleGuard>
      )
    },
    {
      path: '/perfil',
      element: (
        <Trabajando />
      )
    },
    {
      path: '/no-autorizado',
      element: <NoAutorizadoPage />
    },
    {
      path: '/no-encontrado',
      element: <NoEncontradoPage />
    },
    {
      path: '*',
      element: <NoEncontradoPage />
    }
  ]
};

export default AuthenticatedRoutes;
