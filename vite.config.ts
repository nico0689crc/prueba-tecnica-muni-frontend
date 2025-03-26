import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {},
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000",
   },
})
