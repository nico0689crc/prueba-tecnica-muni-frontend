import { useMemo } from "react";
import useSWR from "swr";
import { GetTareasType } from "@/types/tarea";
import { fetcher } from "@/utils/axios";

type useGetTareasProps = {
  pagina: number;
}

export const useGetTareas = ({ pagina } : useGetTareasProps) => {
  const { data, isLoading, isValidating, error } : GetTareasType = useSWR(`/tareas?page=${pagina}`, fetcher);

  const memoizedValue = useMemo(
    () => ({
      tareas: data?.data,
      isLoading,
      error: error,
      boardValidating: isValidating,
      isEmpty: !isLoading && !data?.data?.length,
      paginas: data?.last_page,
      paginaActual: data?.current_page,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}