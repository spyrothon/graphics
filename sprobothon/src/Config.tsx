import { EnvConfig } from "./config/env";

const environment = process.env.NODE_ENV ?? "dev";

const config = await import(`./config/env.${environment}.tsx`);
export default config.default as EnvConfig;
