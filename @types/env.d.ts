/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_SYNC_HOST: string;
  readonly VITE_ASSETS_ENDPOINT: string;
  readonly VITE_APP_HOST: string;
  readonly VITE_ADMIN_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
