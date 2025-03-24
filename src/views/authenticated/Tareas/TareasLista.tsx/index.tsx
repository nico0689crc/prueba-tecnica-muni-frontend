import { Tarea } from "@/types/tarea";
import { Stack, Grid2, Card, CardContent, Typography, Pagination } from "@mui/material";

type TareasListaProps = {
  tareas: Tarea[];
  paginas: number;
  paginaActual: number;
  handleCambioDePagina: (event: React.ChangeEvent<unknown>, nuevaPagina: number) => void;
}

const TareasLista = ({ tareas, paginaActual, paginas, handleCambioDePagina }: TareasListaProps ) => {
  return (
    <Stack direction='column' spacing={4} alignItems='center' height='100%' justifyContent='space-between'>
      <Grid2 container spacing={2}>
        {tareas?.map((tarea) => (
          <Grid2 key={tarea.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ minHeight: 200 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant='h6' color="primary">
                  {tarea.titulo}
                </Typography>
                <Typography variant='body2' color="text.secondary">
                  {tarea.detalles}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Pagination count={paginas} page={paginaActual} color="primary" onChange={handleCambioDePagina} sx={{ pb: 5 }} />
    </Stack>
  );
}

export default TareasLista;