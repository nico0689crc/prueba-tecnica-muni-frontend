import { createContext } from "react";
import { Tarea } from "@/types/tarea";

type EliminarTareaContextProps = {
  tarea: Tarea | null;
  isDialogEliminarTareaOpen: boolean;
  openEliminarTareaDialog: (_tarea: Tarea) => void;
  handleEliminarTarea: (page: number) => void;
  closeEliminarTareaDialog: () => void;
}

const initialState = {
  tarea: null,
  isDialogEliminarTareaOpen: false,
  openEliminarTareaDialog: (_tarea: Tarea) => {},
  handleEliminarTarea: () => {},
  closeEliminarTareaDialog: () => {}
}

export const EliminarTareaContext = createContext<EliminarTareaContextProps>(initialState);