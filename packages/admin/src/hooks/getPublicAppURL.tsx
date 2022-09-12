import { APP_HOST } from "@spyrothon/api";
import { AppRoutes } from "@admin/Constants";

export default function getPublicAppURL(route: typeof AppRoutes[keyof typeof AppRoutes]) {
  return `${APP_HOST}${route}`;
}
