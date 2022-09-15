import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  define: {
    __API_BASE__: JSON.stringify("http://localhost:4000/api"),
    __API_VERSION__: JSON.stringify("v1"),
    __SYNC_HOST__: JSON.stringify("localhost:3000/socket/sync"),
    __ASSETS_ENDPOINT__: JSON.stringify("//localhost:8081"),
    __APP_HOST__: JSON.stringify("//localhost:8081"),
    __ADMIN_PATH__: JSON.stringify("/admin"),
    __PAGE_TITLE__: JSON.stringify("Spyrothon Admin"),
  },
});
