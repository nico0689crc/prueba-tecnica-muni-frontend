import { useCallback, useMemo, useState } from "react";
import { useSWRConfig }from "swr";

import useSnackbar from "@/hooks/useSnackbar";
import { Tarea } from "@/types/tarea";
import { EliminarTareaContext } from "./EliminarTareaContext";
import { deleteFetcher } from "@/utils/axios";

export const EliminarTareaProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDialogEliminarTareaOpen, setDialogEliminarTareaOpen] = useState(false);
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const { openSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const openEliminarTareaDialog = useCallback((tarea: Tarea) => {
    setTarea(tarea);
    setDialogEliminarTareaOpen(true);
  }, [setTarea, setDialogEliminarTareaOpen]);

  const closeEliminarTareaDialog = useCallback(() => {
    setTarea(null);
    setDialogEliminarTareaOpen(false);
  }, [setTarea, setDialogEliminarTareaOpen]);

  const handleEliminarTarea = useCallback(async (page: number) => {
    if (tarea) {
      try {
        await deleteFetcher(`/tareas/${tarea.id}`);
        console.log(`/tareas?page=${page}`);
        
        mutate(`/tareas?page=${page}`);
        openSnackbar('La tarea ha sido eliminada exitosamente.', 'success');
      } catch (error: any) {
        openSnackbar(error?.message ??'Ocurrió un error al eliminar la tarea.', 'error');
      }
      setDialogEliminarTareaOpen(false);
    }
  }, [tarea, setDialogEliminarTareaOpen, openSnackbar]);

  const value = useMemo(() => ({
    tarea,
    isDialogEliminarTareaOpen,
    openEliminarTareaDialog,
    closeEliminarTareaDialog, 
    handleEliminarTarea 
  }), [handleEliminarTarea, tarea, isDialogEliminarTareaOpen, openEliminarTareaDialog, closeEliminarTareaDialog]);

  return (
    <EliminarTareaContext.Provider value={value}>
      {children}
    </EliminarTareaContext.Provider>
  );
} 