import { useContext } from 'react';

import { EliminarTareaContext } from '../context/EliminarTareaContext';

export default function useEliminarTarea() {
  const context = useContext(EliminarTareaContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
