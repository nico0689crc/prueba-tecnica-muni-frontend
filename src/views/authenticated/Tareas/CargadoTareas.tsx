import { Stack, CircularProgress, Typography } from "@mui/material";

const CargadoTareas = () => {
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
        Cargando tareas...
      </Typography>
    </Stack>
  );
} 

export default CargadoTareas;