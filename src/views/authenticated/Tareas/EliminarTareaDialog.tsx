import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useEliminarTarea from './hooks/useEliminarTarea';
import { IconTrash, IconX} from '@tabler/icons-react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EliminarTareaDialog = () => {
  const { tarea, isDialogEliminarTareaOpen, closeEliminarTareaDialog, handleEliminarTarea } = useEliminarTarea();
 
  return (
    <Dialog
      open={isDialogEliminarTareaOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeEliminarTareaDialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {`Eliminar tarea "${tarea?.titulo}"`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Esta acción no se puede deshacer. Por favor, confirme si desea proceder con la eliminación de esta tarea.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button startIcon={<IconTrash />} onClick={handleEliminarTarea} variant='contained' color='error'>Eliminar</Button>
        <Button startIcon={<IconX />} onClick={closeEliminarTareaDialog} variant='outlined' color='error'>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EliminarTareaDialog;