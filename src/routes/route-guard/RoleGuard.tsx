import useAuth from '@/hooks/useAuth';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole: string;
}

const RoleGuard: FC<RoleGuardProps> = ({ children, requiredRole = 'admin' }) => {
  const { user } = useAuth();

  if (user?.role === requiredRole) {
    return <>{children}</>;
  }

  return <Navigate to="/no-autorizado" replace />
};

export default RoleGuard;
