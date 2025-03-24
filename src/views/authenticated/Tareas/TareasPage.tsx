import { useSearchParams, useNavigate } from 'react-router-dom';
import { Stack, Typography } from "@mui/material";

import { useGetTareas } from "@/hooks/useTareas";

import SinTareas from "./SinTareas";
import CargadoTareas from "./CargadoTareas";
import TareasLista from "./TareasLista.tsx";
import { useCallback, useEffect, useState } from "react";

const Tareas = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paginaDesdeUrl = searchParams.get('pagina') ? parseInt(searchParams.get('pagina')!) : 1;
  const [pagina, setPagina] = useState<number>(paginaDesdeUrl);

  const { tareas, isLoading, isEmpty, paginas } = useGetTareas({ pagina, tamanoPagina: 6 });

  const handleCambioDePagina = useCallback((_: any, nuevaPagina: number) => {
    setPagina(() => nuevaPagina);
  }, []);

  useEffect(() => {
    setPagina( () => paginaDesdeUrl);
  }, [paginaDesdeUrl]);

  useEffect(() => {
    if (pagina !== paginaDesdeUrl) {
      navigate(`/tareas?pagina=${pagina}`, { replace: true });
    }
  }, [pagina, paginaDesdeUrl]);

  return (
    <Stack direction='column' spacing={2} height='100%'>
      <Typography variant='h5' color="primary">
        Tareas
      </Typography>
      
      {isLoading && <CargadoTareas />}
      {!isLoading && isEmpty && <SinTareas />}
      {!isLoading && !isEmpty && (
        <TareasLista 
          tareas={tareas} 
          paginas={paginas} 
          paginaActual={pagina} 
          handleCambioDePagina={handleCambioDePagina}
        />
      )}
    </Stack>
  )
}

export default Tareas;