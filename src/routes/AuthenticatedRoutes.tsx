import { lazy } from 'react';

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import Loadable from '@/ui-component/Loadable';
import AuthGuard from '@/routes/route-guard/AuthGuard'; // Cambia la ruta si no usas alias

const Inicio = Loadable(lazy(() => import('@/views/authenticated/Inicio/InicioPage')));
const Tareas = Loadable(lazy(() => import('@/views/authenticated/Tareas/TareasPage')));

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
    }
  ]
};

export default AuthenticatedRoutes;
