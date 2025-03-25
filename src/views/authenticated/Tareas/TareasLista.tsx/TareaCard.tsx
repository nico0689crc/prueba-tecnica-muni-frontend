import { Link } from "react-router-dom"
import { Card, CardContent, Typography, Box, Avatar, Grid2, Stack, Chip, CardActions, Button, Divider, Tooltip, useTheme } from '@mui/material';
import { IconEdit, IconTrash, IconPencilX, IconPencilShare, IconPencilCheck, IconAntennaBars2, IconAntennaBars4, IconAntennaBars5 } from "@tabler/icons-react";

import { Tarea } from '@/types/tarea';
import useEliminarTarea from "../hooks/useEliminarTarea";
import useAuth from "@/hooks/useAuth";

type TareasPageProps = {
  tarea: Tarea;
};

const TareaCard = ({ tarea }:TareasPageProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { openEliminarTareaDialog } = useEliminarTarea();

  return (
    <Grid2 size={{ xs: 12, lg: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', p: 2, borderRadius: 4, boxShadow: 2, height: '100%' }}>
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography variant="h6" noWrap sx={{ display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
            {tarea.titulo}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between',  mt: 1 }}>
            <Stack direction='row' spacing={1} sx={{ mt: 2 }}>
              <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }} fontWeight="bold">
                Estado:
              </Typography>
              <Chip
                label={tarea.estado === 'pendiente' ? 'Pendiente' : tarea.estado === 'en_progreso' ? 'En Progreso' : 'Finalizado'}
                size='small'
                variant="outlined"
                color={tarea.estado === 'pendiente' ? 'warning' : tarea.estado === 'en_progreso' ? 'info' : 'success'}
                icon={
                  tarea.estado === 'pendiente' ? <IconPencilX size={15} /> : tarea.estado === 'en_progreso' ? <IconPencilShare size={15} /> : <IconPencilCheck size={15} />
                }
              />
            </Stack>
            <Stack direction='row' spacing={1} sx={{ mt: 2 }} alignItems='center'>
              <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }} fontWeight="bold">
                Prioridad:
              </Typography>
              <Chip 
                label={tarea.prioridad === 'alta' ? 'Alta' : tarea.prioridad === 'media' ? 'Media' : 'Baja'} 
                color={tarea.prioridad === 'alta' ? 'error' : tarea.prioridad === 'media' ? 'warning' : 'success'}
                variant="outlined"
                size='small'
                icon={
                  tarea.prioridad === 'alta' ? <IconAntennaBars5 size={15} /> : tarea.prioridad === 'media' ? <IconAntennaBars4 size={15} /> : <IconAntennaBars2 size={15} />
                } 
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
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button component={Link} to={`/tareas/${tarea.id}/editar`} aria-label="editar" color='primary' size='small' startIcon={<IconEdit />} title='Editar Tarea' variant='outlined'>
            Editar
          </Button>
          {user?.role === 'admin' && (
            <Button onClick={() => openEliminarTareaDialog(tarea)} aria-label="eliminar" color='error' size='small' startIcon={<IconTrash />} title='Eliminar Tarea' variant='outlined'>
              Eliminar
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default TareaCard;


