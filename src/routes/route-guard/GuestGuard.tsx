import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import { DASHBOARD_PATH } from '@/routes/paths';
import { GuardProps } from '@/types';
import { useEffect } from 'react';

export default function GuestGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(DASHBOARD_PATH, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
}
