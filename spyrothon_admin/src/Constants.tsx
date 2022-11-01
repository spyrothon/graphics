// import { Routes as AppRoutes } from "@app/Constants";
const AppRoutes = {
  NEWSLETTER: (_newsletterId: string) => "#",
};

export const Routes = {
  BASE_PATH: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  // DASHBOARDS
  SCHEDULE_EDITOR: "/schedule-editor",
  LIVE_DASHBOARD: "/live",

  // SETTINGS
  SETTINGS: "/settings",
  SETTINGS_OBS: "/settings/obs",
  SETTINGS_TWITCH: "/settings/twitch",
  SETTINGS_CREATE_SCHEDULE: "/settings/create-schedule",
  SETTINGS_MANAGE_SCHEDULE: "/settings/manage-schedule",
  SETTINGS_PARTICIPANTS: "/settings/participants",
  SETTINGS_USER: "/settings/user",

  // Publishing
  PUBLISHING: "/publishing",
  PUBLISHING_NEWSLETTERS: "/publishing/newsletters",
  PUBLISHING_NEWSLETTER: (newsletterId: string) => `/publishing/newsletters/${newsletterId}`,
  PUBLISHING_NEWSLETTERS_NEW: "/publishing/newsletters/new",
  PUBLISHING_NEWSLETTERS_EDIT: (newsletterId: string) =>
    `/publishing/newsletters/${newsletterId}/edit`,
  PUBLISHING_ARTICLES: "/publishing/articles",
  PUBLISHING_ARTICLES_NEW: "/publishing/articles/new",
  PUBLISHING_ARTICLES_EDIT: (articleId: string) => `/publishing/articles/${articleId}/edit`,
};

export { AppRoutes };
