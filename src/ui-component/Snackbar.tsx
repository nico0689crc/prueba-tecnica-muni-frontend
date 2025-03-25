import useSnackbar from "@/hooks/useSnackbar";
import { Alert, IconButton, Snackbar as SnackbarMUI } from "@mui/material";
import { IconX } from "@tabler/icons-react";

const Snackbar = () => {
  const { open, closeSnackbar, message, severity, autoHideDuration } = useSnackbar();

  return (
    <SnackbarMUI
      open={open}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      key={'bottom-right'}
      autoHideDuration={autoHideDuration}
    >
      <Alert
        severity={severity}
        variant='filled'
        color={severity}
        action={
          <IconButton
            sx={{
              color: 'white',
              padding: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
            size="small"
            aria-label="close"
            onClick={closeSnackbar}
          >
            <IconX size={20} />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </SnackbarMUI>
  );
}

export default Snackbar;