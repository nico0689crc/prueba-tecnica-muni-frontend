import { Stack, CircularProgress, Typography } from "@mui/material";

type CargadoDatosProps = {
  mensaje: string;
}

const CargadoDatos = ({ mensaje } : CargadoDatosProps) => {
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

export default CargadoDatos;