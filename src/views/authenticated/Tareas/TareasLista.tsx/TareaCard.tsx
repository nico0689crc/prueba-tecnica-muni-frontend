import { Link } from "react-router-dom"
import { Card, CardContent, Typography, Box, Avatar, Grid2, Stack, Chip, CardActions, Button, Divider, Tooltip, useTheme } from '@mui/material';
import { IconEdit, IconEye, IconTrash, IconPencilX, IconPencilShare, IconPencilCheck } from "@tabler/icons-react";

import { Tarea } from '@/types/tarea';

type TareasPageProps = {
  tarea: Tarea;
};

const TareaCard = ({ tarea }:TareasPageProps) => {
  const theme = useTheme();

  return (
    <Grid2 size={{ xs: 12, lg: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', p: 2, borderRadius: 8, boxShadow: 2, height: '100%' }}>
        <CardContent sx={{ flex: '1 1 auto' }}>
          {/* Titulo de la tarea */}
          <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
            {tarea.titulo}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between',  mt: 1 }}>
            <Stack direction='row' spacing={1} sx={{ mt: 2 }}>
              <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }} fontWeight="bold">
                Estado:
              </Typography>
              <Chip
                label={tarea.estado === 'pendiente' ? 'Pendiente' : tarea.estado === 'en_progreso' ? 'En Progreso' : 'Finalizado'}
                sx={{
                  color: theme => theme.palette.grey[50],
                  mt: 2,
                  backgroundColor: theme => tarea.estado === 'pendiente' ? 
                    theme.palette.warning.light : tarea.estado === 'en_progreso' 
                    ? theme.palette.info.light : theme.palette.success.light,
                }}
                size='small'
              />
            </Stack>
            <Stack direction='row' spacing={1} sx={{ mt: 2 }} alignItems='center'>
              <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }} fontWeight="bold">
                Prioridad:
              </Typography>
              <Chip 
                label={tarea.prioridad === 'alta' ? 'Alta' : tarea.prioridad === 'media' ? 'Media' : 'Baja'} 
                sx={{ 
                  color: theme => theme.palette.grey[50],
                  mt: 2,
                  backgroundColor: theme => tarea.prioridad === 'alta' ? theme.palette.error.light : tarea.prioridad === 'media' ? theme.palette.warning.light : theme.palette.success.light,
                }}
                size='small' 
              />
            </Stack>
          </Stack>

          <Typography variant="body2" color="textSecondary" 
            sx={{ mt: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, textAlign: 'justify' }}
          >
            {tarea.detalles}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }} fontWeight="bold">
              Fecha de Creación:
            </Typography>
            <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }}>
              {new Date(tarea.created_at).toLocaleDateString()}
            </Typography>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textPrimary" fontWeight="bold">
              Usuarios Asignados:
            </Typography>
            <Grid2 container spacing={2} sx={{ mt: 1 }}>
              {tarea.usuarios.map((usuario) => (
                <Grid2 key={usuario.id} size={12}>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Avatar 
                      sx={{ width: 24, height: 24, p:2, backgroundColor: theme => usuario.role === 'admin' ? theme.palette.primary.main : theme.palette.primary.light }} 
                      children={<Typography variant="body2">{usuario.first_name[0]}{usuario.last_name[0]}</Typography>} 
                    />
                    <Typography variant="body2" sx={{ color: theme => usuario.role === 'admin' ? theme.palette.primary.main : theme.palette.primary.light }}>
                      {usuario.first_name} {usuario.last_name} {usuario.role === 'admin' && '(Administrador)'}
                    </Typography>
                    {usuario.role !== 'admin' && (

                        // <IconPencilCheck size={20} />
                      <Tooltip 
                        title={usuario.pivot.estado === 'pendiente' ? 'Pendiente' : usuario.pivot.estado === 'en_progreso' ? 'En Progreso' : 'Finalizado'}
                        arrow
                        sx={{ cursor: 'pointer' }}
                      >
                        {
                          usuario.pivot.estado === 'pendiente' ? 
                            <IconPencilX size={20} color={theme.palette.warning.light} /> : usuario.pivot.estado === 'en_progreso' 
                              ? <IconPencilShare size={20} color={theme.palette.info.light} /> : <IconPencilCheck size={20} color={theme.palette.success.light} />
                        }
                      </Tooltip>
                    )}
                  </Stack>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </CardContent>
        <Divider sx={{ my: 2 }} />
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Button component={Link} to={`/tareas/${tarea.id}`} aria-label="ver" color='success' size='small' startIcon={<IconEye />} title='Ver Tarea' variant='outlined'>
            Ver 
          </Button>
          <Button component={Link} to={`/tareas/${tarea.id}/editar`} aria-label="editar" color='primary' size='small' startIcon={<IconEdit />} title='Editar Tarea' variant='outlined'>
            Editar
          </Button>
          <Button component={Link} to={`/tareas/${tarea.id}/eliminar`} aria-label="eliminar" color='error' size='small' startIcon={<IconTrash />} title='Eliminar Tarea' variant='outlined'>
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default TareaCard;


