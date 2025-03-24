import { createBrowserRouter } from 'react-router-dom';

import AuthenticatedRoutes from './AuthenticatedRoutes';
import GuestRoutes from './GuestRoutes';

const router = createBrowserRouter([GuestRoutes, AuthenticatedRoutes], {
  basename: "/"
});

export default router;
