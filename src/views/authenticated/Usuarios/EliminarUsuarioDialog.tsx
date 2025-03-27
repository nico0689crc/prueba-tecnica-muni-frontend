import { Usuario } from '@/types/tarea';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IconTrash, IconX } from '@tabler/icons-react';
import { forwardRef, memo } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EliminarUsuarioDialogProps {
  isDialogEliminarUsuarioOpen: boolean;
  cerrarEliminarUsuarioDialog: () => void;
  handleEliminarUsuario: (usuarioId: number) => void;
  usuario: Usuario | null;
}

const EliminarUsuarioDialog = memo(
  ({
    isDialogEliminarUsuarioOpen,
    cerrarEliminarUsuarioDialog,
    handleEliminarUsuario,
    usuario,
  }: EliminarUsuarioDialogProps) => {
    const handleEliminarClick = () => {
      if (usuario) {
        handleEliminarUsuario(usuario.id!);
      }
    };

    return (
      <Dialog
        open={isDialogEliminarUsuarioOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={cerrarEliminarUsuarioDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {`Eliminar usuario "${usuario?.first_name} ${usuario?.last_name}"`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Esta acción no se puede deshacer. Por favor, confirme si desea
            proceder con la eliminación de este usuario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {usuario && (
            <Button
              startIcon={<IconTrash />}
              onClick={handleEliminarClick}
              variant="contained"
              color="error"
            >
              Eliminar
            </Button>
          )}
          <Button
            startIcon={<IconX />}
            onClick={cerrarEliminarUsuarioDialog}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default EliminarUsuarioDialog;