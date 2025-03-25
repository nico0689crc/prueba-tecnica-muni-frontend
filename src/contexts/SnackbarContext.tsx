import { createContext, useCallback, useMemo, useState } from "react";

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

type SnackbarContextType = {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  autoHideDuration?: number;
  openSnackbar: (message: string, severity: SnackbarSeverity) => void;
  closeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  open: true,
  message: '',
  severity: 'success',
  autoHideDuration: 3000,
  openSnackbar: (_message: string, _severity: SnackbarSeverity) => {},
  closeSnackbar: () => {},
});

type SnackbarProviderProps = {
  children: React.ReactNode;
};

export const SnackbarProvider = ({ children } : SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SnackbarSeverity>('info');
  const [autoHideDuration, setAutoHideDuration] = useState(5000);

  const openSnackbar = useCallback((message: string, severity: SnackbarSeverity, autoHideDuration?: number) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
    if (autoHideDuration){
      setAutoHideDuration(autoHideDuration);
    }
  }, []);

  const closeSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(() => ({ 
    open,
    message,
    severity,
    autoHideDuration,
    openSnackbar,
    closeSnackbar,
  }), [open, message, severity, openSnackbar, closeSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
}