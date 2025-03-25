import { Tarea } from "@/types/tarea";
import { useCallback, useMemo, useState } from "react";
import { EliminarTareaContext } from "./EliminarTareaContext";

export const EliminarTareaProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDialogEliminarTareaOpen, setDialogEliminarTareaOpen] = useState(false);
  const [tarea, setTarea] = useState<Tarea | null>(null);

  const openEliminarTareaDialog = useCallback((tarea: Tarea) => {
    setTarea(tarea);
    setDialogEliminarTareaOpen(true);
  }, [setTarea, setDialogEliminarTareaOpen]);

  const closeEliminarTareaDialog = useCallback(() => {
    setTarea(null);
    setDialogEliminarTareaOpen(false);
  }, [setTarea, setDialogEliminarTareaOpen]);

  const handleEliminarTarea = useCallback(() => {
    if (tarea) {
      console.log(`Eliminar tarea con id: ${tarea.id}`);
      setDialogEliminarTareaOpen(false);
    }
  }, [tarea, setDialogEliminarTareaOpen]);

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