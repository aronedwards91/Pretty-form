import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  console.log('>>>env', env);
  console.log('>>>mode', mode);
  console.log('>>>APP_URL from env:', env.VITE_APP_URL);
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      open: true
    },
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          form: 'form/index.html' // This will be served at /form/
        }
      }
    },
    // Make env variables available to the app
    // define: {
    //   __APP_URL__: JSON.stringify(env.APP_URL)
    // }
  }
}) 