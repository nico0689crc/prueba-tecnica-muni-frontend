import { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/axios";
import { Usuario } from "@/types/tarea";

export const useUsuarios = () => {
  const {
    data: usuarios,
    isLoading,
    isValidating,
    error,
  } : {
    data: Usuario[],
    isLoading: boolean,
    isValidating: boolean,
    error: any,
  } = useSWR(`/usuarios`, fetcher);

  const memoizedValue = useMemo(
    () => ({
      usuarios,
      isLoading,
      error,
      isValidating,
    }),
    [usuarios, isLoading, error, isValidating]
  );

  return memoizedValue;
}