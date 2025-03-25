import CustomBreadcrumbs from "@/ui-component/Breadcrumb";
import { Stack, Card, Typography } from "@mui/material";
import { IconHome, IconUsersGroup } from "@tabler/icons-react";

const UsuariosPage = () => {
  return (
    <Stack direction='column' spacing={2}>
      <CustomBreadcrumbs
        items={
          [
            { label: 'Inicio', to: '/', icon: <IconHome size={15} /> },
            { label: 'Usuarios', to: '/usuarios', icon: <IconUsersGroup size={15} /> }
          ]
        }
      />
      <Card variant='outlined' sx={{ px: 3, py: 2, borderRadius: 2 }}>
        <Stack sx={{ "svg": { color: theme => theme.palette.primary.main } }} direction='row' spacing={1} alignItems='center'>
          <IconUsersGroup size={20} />
          <Typography variant='h6' color="primary">
            Usuarios
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
}

export default UsuariosPage;
