import { Stack, Box, CardMedia, Typography, Button } from "@mui/material";
import { Link as LinkRouter } from 'react-router-dom';

import NoEncotradoIlustracion from '@/assets/illustrations/no_encontrado.svg';
import useAuth from "@/hooks/useAuth";

const NoEncotrado = () => {
  const { user } = useAuth();

  return (
    <Stack alignItems='center' justifyContent='center' spacing={2} height='100%'>
      <Box sx={{ width: { xs: 350, sm: 500 } }}>
        <CardMedia component="img" src={NoEncotradoIlustracion} style={{ height: '100%', width: '100%' }} />
      </Box>
      <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
        {`${user?.first_name}, pagina o recurso no encontrado`}
      </Typography>
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }} variant='body2'>
        Parece que la página o recurso que buscas no existe. Si crees que esto es un error, por favor contacta con tu administrador para más información.
      </Typography>
      <Button component={LinkRouter} to='/inicio' size='large' color='primary' variant='contained'>
        Ir a Inicio
      </Button>
    </Stack>
  );
}

export default NoEncotrado;