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
  } = useSWR<Usuario[]>(`/usuarios`, fetcher);

  const isEmpty = !isLoading && !error && usuarios && usuarios.length === 0;

  const memoizedValue = useMemo(
    () => ({
      usuarios,
      isLoading,
      error,
      isValidating,
      isEmpty,
    }),
    [usuarios, isLoading, error, isValidating,]
  );

  return memoizedValue;
}

export const useUsuario = (id: string) => {
  const {
    data: usuario,
    isLoading,
    isValidating,
    error,
  } = useSWR<Usuario>(`/usuarios/${id}`, fetcher);

  const memoizedValue = useMemo(
    () => ({
      usuario,
      isLoading,
      error,
      isValidating,
    }),
    [usuario, isLoading, error, isValidating]
  );

  return memoizedValue;
}