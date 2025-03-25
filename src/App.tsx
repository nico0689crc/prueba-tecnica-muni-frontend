import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "./theme"
import router from './routes';
import { AuthProvider } from './contexts/AuthContext';
import ConfigProvider from './contexts/ConfigContext';
import { EliminarTareaProvider } from './views/authenticated/Tareas/context/EliminarTareaProvider';
import { SnackbarProvider } from './contexts/SnackbarContext';
import Snackbar from './ui-component/Snackbar';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfigProvider>
          <SnackbarProvider>
            <EliminarTareaProvider>
              <RouterProvider router={router}/>
              <Snackbar />
            </EliminarTareaProvider>
          </SnackbarProvider>
        </ConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
