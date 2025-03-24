import { Tarea } from "@/types/tarea";
import { Stack, Grid2, Pagination } from "@mui/material";
import TareaCard from "./TareaCard";

type TareasListaProps = {
  tareas: Tarea[];
  paginas: number;
  paginaActual: number;
  handleCambioDePagina: (event: React.ChangeEvent<unknown>, nuevaPagina: number) => void;
}

const TareasLista = ({ tareas, paginaActual, paginas, handleCambioDePagina }: TareasListaProps ) => {
  return (
    <Stack direction='column' spacing={4} alignItems='center' height='100%' justifyContent='space-between'>
      <Grid2 container spacing={4} sx={{ width: '100%' }}>
        {tareas?.map((tarea) => <TareaCard key={tarea.id} tarea={tarea} />)}
      </Grid2>
      <Pagination count={paginas} page={paginaActual} color="primary" onChange={handleCambioDePagina} sx={{ pb: 5 }} />
    </Stack>
  );
}

export default TareasLista;