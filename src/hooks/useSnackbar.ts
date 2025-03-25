import { useContext } from 'react';
import { SnackbarContext } from '@/contexts/SnackbarContext';

export default function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
