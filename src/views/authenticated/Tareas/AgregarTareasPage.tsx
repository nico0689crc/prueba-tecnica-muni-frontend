import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSWRConfig } from "swr";

import {
  Button,
  Card,
  Divider,
  FormHelperText,
  Grid2,
  InputLabel,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  IconAntennaBars2,
  IconAntennaBars4,
  IconAntennaBars5,
  IconHome,
  IconTableSpark,
} from "@tabler/icons-react";

import CustomBreadcrumbs from "@/ui-component/Breadcrumb";
import useSnackbar from "@/hooks/useSnackbar";
import { postFetcher } from "@/utils/axios";

const AgregarTareasPage = () => {
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { openSnackbar } = useSnackbar();
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: { titulo: string; detalles: string; prioridad: string; estado: string }) => {
      try {
        const response = await postFetcher("/tareas", values);
        console.log(response);
        
        openSnackbar("Tarea creada correctamente", "success");
        if (response.id) {
          navigate(`/tareas/${response.id}/editar`, { replace: true });
        }
      } catch (error: any) {
        openSnackbar(error.message, "error");
      }
    },
    [mutate, openSnackbar]
  );

  return (
    <Stack direction="column" spacing={2}>
      <CustomBreadcrumbs
        items={[
          { label: "Inicio", to: "/", icon: <IconHome size={15} /> },
          { label: "Tareas", to: "/tareas", icon: <IconTableSpark size={15} /> },
          { label: "Agregar Tarea", to: "/tareas/agregar", icon: <IconTableSpark size={15} /> },
        ]}
      />
      <Card variant="outlined" sx={{ px: 3, py: 2, borderRadius: 2 }}>
        <Typography variant="h6" color="primary">
          Agregar Nueva Tarea
        </Typography>
      </Card>
      <Card variant="outlined" sx={{ px: 3, py: 2, borderRadius: 2 }}>
        <Formik
          initialValues={{
            titulo: "",
            detalles: "",
            prioridad: "baja",
            estado: "pendiente",
          }}
          validationSchema={Yup.object().shape({
            titulo: Yup.string().required("El título es obligatorio"),
            detalles: Yup.string().required("El detalle es obligatorio"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid2 container spacing={2}>
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
                      onChange={(_e, newPrioridad) =>
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
                    <InputLabel sx={{ fontWeight: "bold" }}>Estado</InputLabel>
                    <ToggleButtonGroup
                      value={values.estado}
                      exclusive
                      aria-label="Estado"
                      orientation={isUpSm ? "horizontal" : "vertical"}
                      onChange={(_e, newEstado) =>
                        handleChange({
                          target: { name: "estado", value: newEstado } as EventTarget &
                            HTMLInputElement,
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                    >
                      <ToggleButton value="pendiente" color="warning">
                        Pendiente
                      </ToggleButton>
                      <ToggleButton value="en_progreso" color="info">
                        En Progreso
                      </ToggleButton>
                      <ToggleButton value="completado" color="success">
                        Completado
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {errors.estado && (
                      <FormHelperText error>{errors.estado}</FormHelperText>
                    )}
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
                      Crear Tarea
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            </form>
          )}
        </Formik>
      </Card>
    </Stack>
  );
};

export default AgregarTareasPage;
