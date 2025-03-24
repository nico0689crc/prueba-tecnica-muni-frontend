import { useContext } from 'react';

import { ConfigContext } from '@/contexts/ConfigContext';

export default function useConfig() {
  const context = useContext(ConfigContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
