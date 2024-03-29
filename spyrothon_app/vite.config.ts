import { resolve } from "path";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: resolve(__dirname, "../tools/postcss"),
  },
  resolve: {
    alias: {
      "@app": resolve(__dirname, "src"),
    },
  },
  envDir: "../env",
  envPrefix: "SPYROTHON_",
  plugins: [react()],
});
