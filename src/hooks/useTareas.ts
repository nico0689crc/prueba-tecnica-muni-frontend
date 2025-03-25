import { useMemo } from "react";
import useSWR from "swr";
import { GetTareasType, GetTareaType } from "@/types/tarea";
import { fetcher } from "@/utils/axios";
import { useNavigate } from "react-router-dom";

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

export const useGetTarea = (id: number) => {
  const navigate = useNavigate();

  const { data, isLoading, isValidating, error }: GetTareaType = useSWR(`/tareas/${id}`, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onError: (error) => {
      if(error?.code_string === "not_authorized") {
        navigate('/no-autorizado', { replace: true });
      }

      if(error?.code_string === "not_found") {
        navigate('/no-encontrado', { replace: true });
      }
    }
  });

  const memoizedValue = useMemo(
    () => ({
      tarea: data,
      isLoading,
      error,
      isValidating
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}