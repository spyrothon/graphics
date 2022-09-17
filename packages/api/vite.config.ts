import { defineConfig } from "vite";

import appConfig from './config/ci.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  define: appConfig,
});
