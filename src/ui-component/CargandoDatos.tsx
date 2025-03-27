import { Stack, CircularProgress, Typography } from "@mui/material";

type CargandoDatosProps = {
  mensaje: string;
}

const CargandoDatos = ({ mensaje } : CargandoDatosProps) => {
  return (
    <Stack 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 2,
        width: '100%',
        height: '100%',
      }} 
    >
      <CircularProgress />
      <Typography variant='body1' color="primary">
        {mensaje}
      </Typography>
    </Stack>
  );
} 

export default CargandoDatos;