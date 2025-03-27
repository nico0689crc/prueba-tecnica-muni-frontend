import { Link, useNavigate, useParams } from "react-router-dom";
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
import { IconHome, IconTableSpark, IconUserPlus } from "@tabler/icons-react";

import CustomBreadcrumbs from "@/ui-component/Breadcrumb";
import useSnackbar from "@/hooks/useSnackbar";
import { putFetcher } from "@/utils/axios";
import { useUsuario } from "@/hooks/useUsuarios";
import CargandoDatos from "@/ui-component/CargandoDatos";

const EditarUsuarioPage = () => {
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { id } = useParams<{ id: string }>();
  const { 
    usuario, 
    isLoading, 
    error
   } = useUsuario(id!);

  const handleSubmit = useCallback(
    async (values: { first_name: string; last_name: string; email: string; role: string; }) => {
      try {
        await putFetcher(`/usuarios/${id}`, values);
        mutate(`/usuarios`);
        openSnackbar("Usuario actualizado correctamente", "success");
        navigate(`/usuarios`, { replace: true });
      } catch (error: any) {
        openSnackbar(error.message, "error");
      }
    },
    [id, navigate, openSnackbar]
  );

  if (isLoading) {
    return <CargandoDatos mensaje="Cargando usuario..." />;
  }

  if (error) {
    return <Typography variant="body1">{error.message}</Typography>;
  }

  if (!usuario) {
    return <Typography variant="body1">Usuario no encontrado</Typography>;
  }

  return (
    <Stack direction="column" spacing={2}>
      <CustomBreadcrumbs
        items={[
          { label: "Inicio", to: "/", icon: <IconHome size={15} /> },
          { label: "Usuarios", to: "/usuarios", icon: <IconTableSpark size={15} /> },
          { label: "Editar Usuario", to: `/usuarios/${id}/editar`, icon: <IconUserPlus size={15} /> },
        ]}
      />
      <Card variant="outlined" sx={{ px: 3, py: 2, borderRadius: 2 }}>
        <Typography variant="h6" color="primary">
          Editar Usuario
        </Typography>
      </Card>
      <Card variant="outlined" sx={{ px: 3, py: 2, borderRadius: 2 }}>
        <Formik
          enableReinitialize
          initialValues={{
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            email: usuario.email,
            role: usuario.role,
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().required("El nombre es obligatorio"),
            last_name: Yup.string().required("El apellido es obligatorio"),
            email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
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
                    <InputLabel sx={{ fontWeight: "bold" }} htmlFor="first_name">
                      Nombre
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="first_name"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Stack>
                </Grid2>
                <Grid2 size={12}>
                  <Stack spacing={2}>
                    <InputLabel sx={{ fontWeight: "bold" }} htmlFor="last_name">
                      Apellido
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="last_name"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Stack>
                </Grid2>
                <Grid2 size={12}>
                  <Stack spacing={2}>
                    <InputLabel sx={{ fontWeight: "bold" }} htmlFor="email">
                      Correo Electrónico
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                </Grid2>
                <Grid2 size={12}>
                  <Stack spacing={2}>
                    <InputLabel sx={{ fontWeight: "bold" }}>Rol</InputLabel>
                    <ToggleButtonGroup
                      value={values.role}
                      exclusive
                      aria-label="Rol"
                      orientation={isUpSm ? "horizontal" : "vertical"}
                      onChange={(_e, newRole) =>
                        handleChange({
                          target: { name: "role", value: newRole } as EventTarget &
                            HTMLInputElement,
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                    >
                      <ToggleButton value="standard" color="info">
                        Standard
                      </ToggleButton>
                      <ToggleButton value="admin" color="primary">
                        Admin
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {errors.role && (
                      <FormHelperText error>{errors.role}</FormHelperText>
                    )}
                  </Stack>
                </Grid2>
                <Divider sx={{ width: "100%" }} />
                <Grid2 size={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      component={Link}
                      to={"/usuarios"}
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
                      Guardar Cambios
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

export default EditarUsuarioPage;
