import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Stack, Typography } from "@mui/material";
import { IconHome, IconTableSpark, IconUsersGroup } from '@tabler/icons-react';

import { useGetTareas } from "@/hooks/useTareas";

import SinTareas from "./SinTareas";
import CargadoTareas from "./CargadoTareas";
import TareasLista from "./TareasLista.tsx";
import CustomBreadcrumbs from "@/ui-component/Breadcrumb.tsx";

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
    <Stack direction='column' spacing={2}>
      <CustomBreadcrumbs
        items={
          [
            { label: 'Inicio', to: '/', icon: <IconHome size={15} /> },
            { label: 'Tareas', to: '/tareas', icon: <IconTableSpark size={15} /> }
          ]
        }
      />
      <Card variant='outlined' sx={{ px: 3, py: 2, borderRadius: 2 }}>
        <Stack sx={{ "svg": { color: theme => theme.palette.primary.main } }} direction='row' spacing={1} alignItems='center'>
          <IconTableSpark size={15} /> 
          <Typography variant='h6' color="primary">
            Tareas asignadas
          </Typography>
        </Stack>
      </Card>
      <Stack direction='column' spacing={2} height='100%'>
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
    </Stack>
  )
}

export default Tareas;