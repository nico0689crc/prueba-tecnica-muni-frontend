import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import { GuardProps } from '@/types';
import { useEffect } from 'react';

export default function AuthGuard({ children }: GuardProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
}
