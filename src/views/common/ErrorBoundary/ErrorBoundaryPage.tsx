import React, { useState, useEffect } from 'react';
import { Stack, Box, CardMedia, Typography } from '@mui/material';
import ErrorIlustracion from '@/assets/illustrations/error.svg';

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [_errorMessage, setErrorMessage] = useState('');

  const handleError = (error: Error) => {
    setHasError(true);
    setErrorMessage(error.message);
  };

  useEffect(() => {
    const tryCatchWrapper = async () => {
      try {
        throw new Error('An error occurred!');
      } catch (error: any) {
        handleError(error);
      }
    };

    tryCatchWrapper();
  }, []);

  if (hasError) {
    return (
      <Stack alignItems='center' justifyContent='center' spacing={2} height='100%'>
        <Box sx={{ width: { xs: 350, sm: 500 } }}>
          <CardMedia component="img" src={ErrorIlustracion} style={{ height: '100%', width: '100%' }} />
        </Box>
        <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
          ¡Ups! Algo salió mal
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 600 }} variant='body2'>
          Parece que algo salió mal. Por favor, vuelve a intentarlo más tarde. 
          Si necesitas asistencia, no dudes en contactar al soporte técnico. ¡Gracias por tu paciencia!
        </Typography>
      </Stack>
    )
  }

  return <>{children}</>;
};

export default ErrorBoundary;