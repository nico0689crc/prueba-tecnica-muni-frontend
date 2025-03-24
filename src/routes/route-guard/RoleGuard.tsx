import useAuth from '@/hooks/useAuth';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole: string;
}

const RoleGuard: FC<RoleGuardProps> = ({ children, requiredRole = 'admin' }) => {
  const { user } = useAuth();

  return user?.role === requiredRole ? (
    <>{children}</>
  ) : (
    <Navigate to="/no-autorizado" replace />
  );
};

export default RoleGuard;
