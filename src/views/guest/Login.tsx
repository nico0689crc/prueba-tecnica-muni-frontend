import { Box, Button, Card, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useTheme } from "@mui/material";

import * as Yup from 'yup';
import { Formik } from "formik";
import useAuth from "@/hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import UsuariosBox from "./UsariosBox";

const Login = () => { 
  const { login } = useAuth();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
        maxWidth: 400,
        margin: '0 auto',
        p: 3,
        borderRadius: '12px',
        textAlign: 'center'
      }}
    >
      <Formik
        initialValues={{
          email: 'administrador@tareas.com',
          password: 'password',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Debe ser un correo electrónico válido').max(255).required('El correo electrónico es obligatorio'),
          password: Yup.string().required('La contraseña es obligatoria')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const trimmedEmail = values.email.trim();
            await login?.(trimmedEmail, values.password);
          
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: unknown) {
            console.log(err);
            
            setStatus({ success: false });
            if (err instanceof Error) {
              setErrors({ submit: err.message });
            } else {
                setErrors({ submit: 'Se ha producido un error interno. Por favor, inténtelo de nuevo más tarde.' });
            }
            setSubmitting(false);
          }
        }}
      >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Stack direction="column" spacing={3}>
            <Typography 
              variant="h5" 
              sx={{ color: theme.palette.primary.main }}
            >
              Iniciar Sesión
            </Typography>

            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
              <InputLabel htmlFor="outlined-adornment-email-login">Correo electrónico</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Correo electrónico"
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
              <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                color="primary"
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
              Iniciar Sesión
            </Button>
          </Stack>
        </form>
      )}
      </Formik>
      <UsuariosBox titulo="Administrador" email="administrador@tareas.com" password="password" />
      <UsuariosBox titulo="Estandard" email="estandard_1@tareas.com" password="password" />
    </Card>
  );
}

export default Login;