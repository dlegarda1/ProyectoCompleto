import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    input: 'src',
  },
  "env": {
    "REACT_APP_API_URL": "https://servidor-gilt.vercel.app"
  }
})