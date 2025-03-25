import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import { Button, Card, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { IconCirclePlusFilled, IconHome, IconTableSpark } from '@tabler/icons-react';

import { useGetTareas } from "@/hooks/useTareas";

import CustomBreadcrumbs from "@/ui-component/Breadcrumb.tsx";
import CargandoDatos from "@/ui-component/CargandoDatos.tsx";

import SinTareas from "./SinTareas";
import TareasLista from "./TareasLista.tsx";
import useAuth from "@/hooks/useAuth.ts";

const Tareas = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isUpMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const paginaDesdeUrl = searchParams.get('pagina') ? parseInt(searchParams.get('pagina')!) : 1;
  const [pagina, setPagina] = useState<number>(paginaDesdeUrl);

  const { tareas, isLoading, isEmpty, paginas } = useGetTareas({ pagina });

  const handleCambioDePagina = useCallback((_: any, nuevaPagina: number) => {
    setPagina(() => nuevaPagina);
  }, []);

  useEffect(() => {
    setPagina(() => paginaDesdeUrl);
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
      <Card variant='outlined' sx={{ display: "flex", px: 3, py: 2, borderRadius: 2, justifyContent: 'space-between' }}>
        <Stack sx={{ "svg": { color: theme => theme.palette.primary.main } }} direction='row' spacing={1} alignItems='center'>
          <IconTableSpark size={15} /> 
          <Typography variant='h6' color="primary">
            Tareas
          </Typography>
        </Stack>
        {user?.role === 'admin' && (
          isUpMd ? (
            <Button component={Link} to="/tareas/agregar" variant='contained' color='primary' startIcon={<IconCirclePlusFilled size={20} />}>
              Agregar Tarea
            </Button>
          ) : (
            <IconButton component={Link} to="/tareas/agregar"  color='primary'>
              <IconCirclePlusFilled size={30} />
            </IconButton>
          )
        )}
      </Card>
      <Stack direction='column' spacing={2} height='100%'>
        {isLoading && <CargandoDatos mensaje="Cargando datos..." />}
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