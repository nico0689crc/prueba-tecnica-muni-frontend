import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import { 
  Button, 
  Card, 
  IconButton, 
  Paper, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Tooltip, 
  Typography, 
  useMediaQuery 
} from "@mui/material";
import { 
  IconCirclePlusFilled, 
  IconEdit, 
  IconHome, 
  IconTrash, 
  IconUsersGroup 
} from "@tabler/icons-react";

import useAuth from "@/hooks/useAuth";
import { useUsuarios } from "@/hooks/useUsuarios";
import { Usuario } from "@/types/tarea";
import CustomBreadcrumbs from "@/ui-component/Breadcrumb";
import CargandoDatos from "@/ui-component/CargandoDatos";
import EliminarUsuarioDialog from "./EliminarUsuarioDialog";
import { deleteFetcher } from "@/utils/axios";
import useSnackbar from "@/hooks/useSnackbar";

const UsuariosPage = () => {
  const { user } = useAuth();
  const { mutate } = useSWRConfig();
  const { openSnackbar } = useSnackbar();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [isDialogEliminarUsuarioOpen, setIsDialogEliminarUsuarioOpen] = useState(false);
  const isUpMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { usuarios, isLoading, isEmpty } = useUsuarios();


  const abrirEliminarUsuarioDialog = useCallback((usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setIsDialogEliminarUsuarioOpen(true);
  }, []);

  const cerrarEliminarUsuarioDialog = useCallback(() => {
    setUsuarioSeleccionado(null);
    setIsDialogEliminarUsuarioOpen(false);
  }, []);

  const handleEliminarUsuario = useCallback(async (usuarioId: number) => {
    try {
      await deleteFetcher(`/usuarios/${usuarioId}`);
      cerrarEliminarUsuarioDialog();
      mutate('/usuarios');
      openSnackbar("El usuario ha sido eliminado exitosamente.", "success");
    } catch (error: any) {
      openSnackbar(error?.message ?? "Ocurrió un error al eliminar el usuario.", "error");
      cerrarEliminarUsuarioDialog();
    }
  }, [cerrarEliminarUsuarioDialog]);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <CustomBreadcrumbs
          items={[
            { label: "Inicio", to: "/", icon: <IconHome size={15} /> },
            { label: "Usuarios", to: "/usuarios", icon: <IconUsersGroup size={15} /> },
          ]}
        />
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            px: 3,
            py: 2,
            borderRadius: 2,
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{ svg: { color: (theme) => theme.palette.primary.main } }}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <IconUsersGroup size={20} />
            <Typography variant="h6" color="primary">
              Usuarios
            </Typography>
          </Stack>
          {user?.role === "admin" &&
            (isUpMd ? (
              <Button
                component={Link}
                to="/usuarios/agregar"
                variant="contained"
                color="primary"
                startIcon={<IconCirclePlusFilled size={20} />}
              >
                Agregar Usuario
              </Button>
            ) : (
              <IconButton component={Link} to="/usuarios/agregar" color="primary">
                <IconCirclePlusFilled size={30} />
              </IconButton>
            ))}
        </Card>
        {isLoading && <CargandoDatos mensaje="Cargando usuarios..." />}
        {!isLoading && usuarios && !isEmpty && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nombre</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Rol</TableCell>
                  <TableCell align="left">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow
                    key={usuario.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {`${usuario.first_name} ${usuario.last_name}`}
                    </TableCell>
                    <TableCell align="left">{usuario.email}</TableCell>
                    <TableCell align="left">
                      {usuario.role === "admin" ? "Administrador" : "Estandar"}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={1} justifyContent="flex-start">
                        <Tooltip
                          title="Editar"
                          arrow
                          placement="top"
                          enterDelay={100}
                          leaveDelay={100}
                        >
                          <IconButton
                            component={Link}
                            to={`/usuarios/${usuario.id}/editar`}
                            color="warning"
                          >
                            <IconEdit size={20} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title="Eliminar"
                          arrow
                          placement="top"
                          enterDelay={100}
                          leaveDelay={100}
                        >
                          <IconButton
                            onClick={() => abrirEliminarUsuarioDialog(usuario)}
                            color="error"
                          >
                            <IconTrash size={20} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
      <EliminarUsuarioDialog
        isDialogEliminarUsuarioOpen={isDialogEliminarUsuarioOpen}
        cerrarEliminarUsuarioDialog={cerrarEliminarUsuarioDialog}
        handleEliminarUsuario={handleEliminarUsuario}
        usuario={usuarioSeleccionado}
      />
    </>
  );
};

export default UsuariosPage;
