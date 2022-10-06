import { APIClient } from "@spyrothon/api";

export default new APIClient({
  baseUrl: import.meta.env.SPYROTHON_API_BASE,
  apiVersion: import.meta.env.SPYROTHON_API_VERSION,
});
