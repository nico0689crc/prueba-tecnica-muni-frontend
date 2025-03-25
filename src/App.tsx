import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "./theme"
import router from './routes';
import { AuthProvider } from './contexts/AuthContext';
import ConfigProvider from './contexts/ConfigContext';
import { EliminarTareaProvider } from './views/authenticated/Tareas/context/EliminarTareaProvider';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfigProvider>
          <EliminarTareaProvider>
            <RouterProvider router={router}/>
          </EliminarTareaProvider>
        </ConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
