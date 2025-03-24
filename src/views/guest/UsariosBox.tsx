import { Box, Typography, Stack, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

type UsuariosBoxProps = {
  titulo: string;
  email: string;
  password: string;
}

const UsuariosBox = ({email, password, titulo}: UsuariosBoxProps) => {
  const theme = useTheme();

  return(
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          p: 1,
          backgroundColor: alpha(theme.palette.success.light, 0.2),
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
          {titulo}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
            Correo electrónico:
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 500 }}>
            {email}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
            Contraseña:
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 500 }}>
            {password}
          </Typography>
        </Stack>
      </Box>
  );
}

export default UsuariosBox;