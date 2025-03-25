import { Stack, Box, CardMedia, Typography, Button } from "@mui/material";
import { Link as LinkRouter } from 'react-router-dom';

import TrabajandoIlustracion from '@/assets/illustrations/wip.svg';
import useAuth from "@/hooks/useAuth";

const Trabajando = () => {
  const { user } = useAuth();

  return (
    <Stack alignItems='center' justifyContent='center' spacing={2} height='100%'>
      <Box sx={{ width: { xs: 350, sm: 500 } }}>
        <CardMedia component="img" src={TrabajandoIlustracion} style={{ height: '100%', width: '100%' }} />
      </Box>
      <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
        {`${user?.first_name}, estamos trabajando en ello`}
      </Typography>
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }} variant='body2'>
        Esta sección está en desarrollo. Por favor, vuelve a intentarlo más tarde. 
        Si necesitas asistencia, no dudes en contactar al soporte técnico. ¡Gracias por tu paciencia!
      </Typography>
      <Button component={LinkRouter} to='/inicio' size='large' color='primary' variant='contained'>
        Ir a Inicio
      </Button>
    </Stack>
  );
}

export default Trabajando;