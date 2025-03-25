import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSWRConfig } from "swr";

import {
  Avatar,
  Button,
  Card,
  Divider,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  PaletteColor,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  IconAntennaBars2,
  IconAntennaBars4,
  IconAntennaBars5,
  IconHome,
  IconPencilCheck,
  IconPencilShare,
  IconPencilX,
  IconTableSpark,
  IconTrash,
  IconCirclePlusFilled
} from "@tabler/icons-react";

import CustomBreadcrumbs from "@/ui-component/Breadcrumb";
import CargandoDatos from "@/ui-component/CargandoDatos.tsx";
import { useGetTarea } from "@/hooks/useTareas";
import useAuth from "@/hooks/useAuth";
import useSnackbar from "@/hooks/useSnackbar";
import { deleteFetcher, postFetcher, putFetcher } from "@/utils/axios";
import { useUsuarios } from "@/hooks/useUsuarios";

const EditarTareasPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tarea, isLoading } = useGetTarea(parseInt(id!));
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { user } = useAuth();
  const { usuarios } = useUsuarios();
  const { openSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();
  const [ miEstado, setMiEstado ] = useState<"pendiente" | "en_progreso" | "finalizado" | null>(null);
  
  useEffect(() => {
    if (tarea) {
      setMiEstado(tarea.usuarios.find(usuario => usuario.id === parseInt(user?.id!))!.pivot.estado);
    }
  } , [tarea]);
  
  const onChangeMiEstadoHandler = useCallback(async (_event: React.MouseEvent<HTMLElement>, value: any) => {
    try {
      setMiEstado(value);
      await putFetcher(`/tareas/${tarea.id}/usuarios/${user!.id}/estado`, { estado: value });
      openSnackbar("Tu estado fue actualizado correctamente", "success");
      mutate(`/tareas/${tarea.id}`);
    } catch (error: any) {
      openSnackbar(error.message, "error");
    }
  }, [tarea]);

  const eliminarUsuarioHandler = useCallback(
    async (id: number) => {
      try {
        await deleteFetcher(`/tareas/${tarea?.id}/usuarios/${id}`);
        mutate(`/tareas/${tarea?.id}`);
        openSnackbar("Usuario eliminado correctamente", "success");
      } catch (error: any) {
        openSnackbar(error.message, "error");
      }
    },
    [tarea, mutate, openSnackbar]
  );

  const renderUsuarios = () =>
    tarea.usuarios.map((usuario) => (
      <Stack key={usuario.id} direction="row" spacing={1} alignItems="center">
        <Avatar
          alt={`${usuario.first_name} ${usuario.last_name}`}
          src={`https://ui-avatars.com/api/?name=${usuario.first_name}+${usuario.last_name}&background=random&color=fff`}
        />
        <Typography variant="body2" color="textPrimary">
          {`${usuario.first_name} ${usuario.last_name}`}
        </Typography>
        {renderUsuarioEstado(usuario.pivot.estado)}
        {usuario.role !== "admin" &&
          usuario.id !== parseInt(user?.id!) && (
            <Tooltip title="Eliminar usuario" arrow>
              <IconButton
                color="error"
                size="small"
                aria-label="Eliminar usuario"
                sx={{ ml: 1 }}
                onClick={() => eliminarUsuarioHandler(usuario.id)}
              >
                <IconTrash size={20} />
              </IconButton>
            </Tooltip>
          )}
      </Stack>
    ));

  const renderUsuarioEstado = (estado: string) => {
    const estadoMap = {
      pendiente: {
        icon: <IconPencilX size={20} />,
        color: "warning",
        label: "Pendiente",
      },
      en_progreso: {
        icon: <IconPencilShare size={20} />,
        color: "info",
        label: "En progreso",
      },
      finalizado: {
        icon: <IconPencilCheck size={20} />,
        color: "success",
        label: "Finalizado",
      },
    };

    const { icon, color, label } =
      estadoMap[estado as keyof typeof estadoMap] || {
        icon: null,
        color: "primary",
        label: "",
      };

    return (
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          "*": {
            color: (theme) =>
              (theme.palette[color as keyof typeof theme.palette] as PaletteColor)
                ?.light || theme.palette.text.primary,
          },
        }}
      >
        {icon}
        <Typography variant="body2">{label}</Typography>
      </Stack>
    );
  };

  if (isLoading) {
    return <CargandoDatos mensaje="Cargando tarea..." />;
  }

  if (!isLoading && tarea) {
    return (
      <Stack direction="column" spacing={2}>
        <CustomBreadcrumbs
          items={[
            { label: "Inicio", to: "/", icon: <IconHome size={15} /> },
            { label: "Tareas", to: "/tareas", icon: <IconTableSpark size={15} /> },
            {
              label: tarea.titulo,
              to: `/tarea/${tarea.id}/editar`,
              icon: <IconTableSpark size={15} />,
            },
          ]}
        />
        <Card variant="outlined" sx={{ px: 3, py: 2, borderRadius: 2 }}>
          <Stack
            sx={{ svg: { color: (theme) => theme.palette.primary.main } }}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <IconTableSpark size={15} />
            <Typography variant="h6" color="primary">
              {tarea.titulo}
            </Typography>
          </Stack>
        </Card>
        <Card variant="outlined" sx={{ px: 3, py: 2, borderRadius: 2 }}>
          <Formik
            initialValues={{
              titulo: tarea.titulo,
              detalles: tarea.detalles,
              prioridad: tarea.prioridad,
              estado: tarea.estado,
            }}
            validationSchema={Yup.object().shape({
              titulo: Yup.string().required("El título es obligatorio"),
              detalles: Yup.string().required("La descripción es obligatoria"),
            })}
            onSubmit={async (values) => {
              try {
                await putFetcher(`/tareas/${tarea.id}`, values);
                mutate(`/tareas/${tarea.id}`);
                openSnackbar("Tarea actualizada correctamente", "success");
              } catch (error: any) {
                openSnackbar(error.message, "error");
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setValues
            }) => { 
              useEffect(() => {
                setValues({
                  titulo: tarea.titulo,
                  detalles: tarea.detalles,
                  prioridad: tarea.prioridad,
                  estado: tarea.estado,
                });
              }, [tarea, setValues]);

              return (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid2 container spacing={2}>
                    {renderFormFields({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      isUpSm,
                      miEstado,
                      onChangeMiEstadoHandler
                    })}
                    <Divider sx={{ width: "100%" }} />
                    <Grid2 size={12}>
                      <Stack spacing={2}>
                        <InputLabel sx={{ fontWeight: "bold" }} htmlFor="usuarios">
                          Usuarios
                        </InputLabel>
                        <Stack spacing={2}>{renderUsuarios()}</Stack>
                        <Stack spacing={2}>
                          {
                            usuarios?.filter(usuario => tarea.usuarios.findIndex(u => u.id === usuario.id) === -1).map(usuario => (
                              <Stack key={usuario.id} direction="row" spacing={1} alignItems="center">
                                <Avatar
                                  alt={`${usuario.first_name} ${usuario.last_name}`}
                                  src={`https://ui-avatars.com/api/?name=${usuario.first_name}+${usuario.last_name}&background=random&color=fff`}
                                />
                                <Typography variant="body2" color="textPrimary">
                                  {`${usuario.first_name} ${usuario.last_name}`}
                                </Typography>
                                <Tooltip title="Agregar usuario" arrow>
                                  <IconButton
                                    color="success"
                                    size="small"
                                    onClick={async () => {
                                      try {
                                        await postFetcher(`/tareas/${tarea.id}/usuarios/${usuario.id}`);
                                        mutate(`/tareas/${tarea.id}`);
                                        openSnackbar("Usuario asignado correctamente", "success");
                                      } catch (error: any) {
                                        openSnackbar(error.message, "error");
                                      }
                                    }}
                                  >
                                    <IconCirclePlusFilled size={20} />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            ))
                          }
                        </Stack>
                      </Stack>
                    </Grid2>
                    <Divider sx={{ width: "100%" }} />
                    <Grid2 size={12}>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                          component={Link}
                          to={"/tareas"}
                          variant="outlined"
                          color="error"
                          type="button"
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Guardar cambios
                        </Button>
                      </Stack>
                    </Grid2>
                  </Grid2>
                </form>
              )
            }}
          </Formik>
        </Card>
      </Stack>
    );
  }
};

const renderFormFields = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  isSubmitting,
  isUpSm,
  onChangeMiEstadoHandler,
  miEstado
}: {
  values: { [key: string]: any };
  errors: { [key: string]: string | undefined };
  touched: { [key: string]: boolean | undefined };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  isUpSm: boolean;
  onChangeMiEstadoHandler: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  miEstado: "pendiente" | "en_progreso" | "finalizado" | null;
}) => (
  <>
    <Grid2 size={12}>
      <Stack spacing={2}>
        <InputLabel sx={{ fontWeight: "bold" }} htmlFor="titulo">
          Título
        </InputLabel>
        <TextField
          fullWidth
          id="titulo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          error={Boolean(touched.titulo && errors.titulo)}
          helperText={touched.titulo && errors.titulo}
        />
      </Stack>
    </Grid2>
    <Grid2 size={12}>
      <Stack spacing={2}>
        <InputLabel sx={{ fontWeight: "bold" }} htmlFor="detalles">
          Detalles
        </InputLabel>
        <TextField
          fullWidth
          id="detalles"
          name="detalles"
          multiline
          rows={4}
          value={values.detalles}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          error={Boolean(touched.detalles && errors.detalles)}
          helperText={touched.detalles && errors.detalles}
        />
      </Stack>
    </Grid2>
    <Grid2 size={12}>
      <Stack spacing={2}>
        <InputLabel sx={{ fontWeight: "bold" }}>Prioridad</InputLabel>
        <ToggleButtonGroup
          value={values.prioridad}
          exclusive
          aria-label="Prioridad"
          orientation={isUpSm ? "horizontal" : "vertical"}
          onChange={(e, newPrioridad) =>
            handleChange({
              target: { name: "prioridad", value: newPrioridad } as EventTarget &
                HTMLInputElement,
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <ToggleButton value="baja" color="success">
            <IconAntennaBars2 size={20} />
            Baja
          </ToggleButton>
          <ToggleButton value="media" color="warning">
            <IconAntennaBars4 size={20} />
            Media
          </ToggleButton>
          <ToggleButton value="alta" color="error">
            <IconAntennaBars5 size={20} />
            Alta
          </ToggleButton>
        </ToggleButtonGroup>
        {errors.prioridad && (
          <FormHelperText error>{errors.prioridad}</FormHelperText>
        )}
      </Stack>
    </Grid2>
    <Grid2 size={12}>
      <Stack spacing={2}>
        <InputLabel sx={{ fontWeight: "bold" }}>Estado de la tarea</InputLabel>
        <ToggleButtonGroup
          value={values.estado}
          exclusive
          aria-label="Estado"
          orientation={isUpSm ? "horizontal" : "vertical"}
          onChange={(e, newEstado) =>
            handleChange({
              target: { name: "estado", value: newEstado } as EventTarget &
                HTMLInputElement,
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <ToggleButton value="pendiente" color="warning">
            <IconPencilX size={20} />
            Pendiente
          </ToggleButton>
          <ToggleButton value="en_progreso" color="info">
            <IconPencilShare size={20} />
            En Progreso
          </ToggleButton>
          <ToggleButton value="completado" color="success">
            <IconPencilCheck size={20} />
            Completado
          </ToggleButton>
        </ToggleButtonGroup>
        {errors.estado && (
          <FormHelperText error>{errors.estado}</FormHelperText>
        )}
      </Stack>
    </Grid2>
    <Grid2 size={12}>
      <Stack spacing={2}>
        <InputLabel sx={{ fontWeight: "bold" }}>Mi estado</InputLabel>
        <ToggleButtonGroup
          value={miEstado}
          exclusive
          aria-label="Estado"
          orientation={isUpSm ? "horizontal" : "vertical"}
          onChange={onChangeMiEstadoHandler}
        >
          <ToggleButton value="pendiente" color="warning">
            <IconPencilX size={20} />
            Pendiente
          </ToggleButton>
          <ToggleButton value="en_progreso" color="info">
            <IconPencilShare size={20} />
            En Progreso
          </ToggleButton>
          <ToggleButton value="finalizado" color="success">
            <IconPencilCheck size={20} />
            Finalizado
          </ToggleButton>
        </ToggleButtonGroup>
        {errors.estado && (
          <FormHelperText error>{errors.estado}</FormHelperText>
        )}
      </Stack>
    </Grid2>
  </>
);

export default EditarTareasPage;