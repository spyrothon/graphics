import { APP_HOST } from "@spyrothon/api";

export default function getPublicAppURL(route: string) {
  return `${APP_HOST}${route}`;
}
