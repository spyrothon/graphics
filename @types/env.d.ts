/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SPYROTHON_API_BASE: string;
  readonly SPYROTHON_API_VERSION: string;
  readonly SPYROTHON_SYNC_HOST: string;
  readonly SPYROTHON_ASSETS_ENDPOINT: string;
  readonly SPYROTHON_APP_HOST: string;
  readonly SPYROTHON_ADMIN_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
