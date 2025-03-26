import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {},
  },
  server: {
    port: parseInt(process.env.FRONTEND_CONTAINER_PORT!) || 3000,
    strictPort: true,
    host: true,
    origin: process.env.SERVER_ORIGIN || 'http://localhost:3000',
   },
})
