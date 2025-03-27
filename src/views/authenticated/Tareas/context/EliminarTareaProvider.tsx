import { useCallback, useMemo, useState } from "react";
import { useSWRConfig } from "swr";

import useSnackbar from "@/hooks/useSnackbar";
import { Tarea } from "@/types/tarea";
import { EliminarTareaContext } from "./EliminarTareaContext";
import { deleteFetcher } from "@/utils/axios";

export const EliminarTareaProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDialogEliminarTareaOpen, setDialogEliminarTareaOpen] = useState(false);
  const [tarea, setTarea] = useState<Tarea | null>(null);
  const { openSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();

  const openEliminarTareaDialog = useCallback(
    (tarea: Tarea) => {
      setTarea(tarea);
      setDialogEliminarTareaOpen(true);
    },
    []
  );

  const closeEliminarTareaDialog = useCallback(() => {
    setTarea(null);
    setDialogEliminarTareaOpen(false);
  }, []);

  const handleEliminarTarea = useCallback(
    async (page: number) => {
      if (!tarea) return;

      try {
        await deleteFetcher(`/tareas/${tarea.id}`);
        mutate(`/tareas?page=${page}`);
        openSnackbar("La tarea ha sido eliminada exitosamente.", "success");
      } catch (error: any) {
        openSnackbar(error?.message ?? "Ocurrió un error al eliminar la tarea.", "error");
      } finally {
        setDialogEliminarTareaOpen(false);
      }
    },
    [tarea, mutate, openSnackbar]
  );

  const value = useMemo(
    () => ({
      tarea,
      isDialogEliminarTareaOpen,
      openEliminarTareaDialog,
      closeEliminarTareaDialog,
      handleEliminarTarea,
    }),
    [tarea, isDialogEliminarTareaOpen, openEliminarTareaDialog, closeEliminarTareaDialog, handleEliminarTarea]
  );

  return <EliminarTareaContext.Provider value={value}>{children}</EliminarTareaContext.Provider>;
};