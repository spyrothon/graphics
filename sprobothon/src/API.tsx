import { APIClient } from "@spyrothon/api";

export default new APIClient({
  baseUrl: process.env.SPYROTHON_API_BASE,
  apiVersion: process.env.SPYROTHON_API_VERSION,
});
