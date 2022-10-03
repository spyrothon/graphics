import api from "render-api";

import { RenderConfig } from "./RenderConfig";

let config: RenderConfig | undefined;

export function configureRenderClient(newConfig: RenderConfig) {
  config = newConfig;
  api.auth(config.apiToken);
}

export default api;
