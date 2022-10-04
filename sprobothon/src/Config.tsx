import { Config } from "./ConfigTypes";

let config: Config | undefined;

export function defineConfig(newConfig: Config) {
  config = newConfig;
}

export function getConfig() {
  return config;
}

export async function loadConfig() {
  const environment = process.env.NODE_ENV ?? "dev";
  await import(`./config/env.${environment}.tsx`);
}
