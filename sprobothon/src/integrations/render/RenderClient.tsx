import api from "render-api";
export * from "render-api";

import Config from "../../Config";

api.auth(Config.render.apiToken);
export default api;
