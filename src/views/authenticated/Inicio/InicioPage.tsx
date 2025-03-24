import { Link as LinkRouter } from 'react-router-dom';

import { Box, Button, CardMedia, Stack, Typography } from '@mui/material';
import wellcomeSrc from '@/assets/illustrations/wellcome.svg';
import useAuth from '@/hooks/useAuth';

const Inicio = () => {
  const { user } = useAuth()
  return (
    <Stack alignItems='center' justifyContent='center' spacing={2} height='100%'>
      <Box sx={{ width: { xs: 350, sm: 500 } }}>
        <CardMedia component="img" src={wellcomeSrc}  style={{ height: '100%', width: '100%' }} />
      </Box>
      <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
        {`Hola ${user?.first_name}, bienvenido a nuestra aplicación`}
      </Typography>
      <Typography sx={{ color: 'text.secondary' }} variant='body2'>
        Organiza tus tareas y mantente al día de forma sencilla y rápida. ¡Estamos aquí para ayudarte!
      </Typography>
      <Button component={LinkRouter} to='/tareas' size='large' color='primary' variant='contained'>
        Ir a tareas
      </Button>
    </Stack>
  )
}

export default Inicio