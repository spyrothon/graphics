import { Config } from "./ConfigTypes";

let config: Config | undefined;

export function defineConfig(newConfig: Config) {
  config = newConfig;
}

export function getConfig() {
  return config;
}

export async function loadConfig(path: string) {
  await import(path);
}
