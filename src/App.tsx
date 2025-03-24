import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "./theme"
import router from './routes';
import { AuthProvider } from './contexts/AuthContext';
import ConfigProvider from './contexts/ConfigContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfigProvider>
          <RouterProvider router={router}/>
        </ConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
