import { Stack, Box, CardMedia, Typography, Button } from "@mui/material";
import { Link as LinkRouter } from 'react-router-dom';

import SinTareasIlustracion from '@/assets/illustrations/sin_datos.svg';
import useAuth from "@/hooks/useAuth";

const SinTareas = () => {
  const { user } = useAuth();

  return (
    <Stack alignItems='center' justifyContent='center' spacing={2} height='100%'>
      <Box sx={{ width: { xs: 350, sm: 500 } }}>
        <CardMedia component="img" src={SinTareasIlustracion}  style={{ height: '100%', width: '100%' }} />
      </Box>
      <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
        {`${user?.first_name}, no tienes tareas asignadas por ahora`}
      </Typography>
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }} variant='body2'>
        Hasta el momento no se ha asignado ninguna tarea. Por favor, revisa más tarde o contacta con tu administrador para más información.
      </Typography>
      <Button component={LinkRouter} to='/inicio' size='large' color='primary' variant='contained'>
        Ir a Inicio
      </Button>
    </Stack>
  );
}

export default SinTareas;