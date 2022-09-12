// import { Routes as AppRoutes } from "@app/Constants";
const AppRoutes = {
  NEWSLETTER: (newsletterId: string) => "#",
};

export const Routes = {
  ADMIN_BASE_PATH: "/admin",
  LOGIN: "/admin/login",
  LOGOUT: "/admin/logout",
  // DASHBOARDS
  SCHEDULE_EDITOR: "/admin/schedule-editor",
  LIVE_DASHBOARD: "/admin/live",

  // SETTINGS
  SETTINGS: "/admin/settings",
  SETTINGS_OBS: "/admin/settings/obs",
  SETTINGS_TWITCH: "/admin/settings/twitch",
  SETTINGS_CREATE_SCHEDULE: "/admin/settings/create-schedule",
  SETTINGS_MANAGE_SCHEDULE: "/admin/settings/manage-schedule",
  SETTINGS_USER: "/admin/settings/user",

  // Publishing
  PUBLISHING: "/admin/publishing",
  PUBLISHING_NEWSLETTERS: "/admin/publishing/newsletters",
  PUBLISHING_NEWSLETTER: (newsletterId: string) => `/admin/publishing/newsletters/${newsletterId}`,
  PUBLISHING_NEWSLETTERS_NEW: "/admin/publishing/newsletters/new",
  PUBLISHING_NEWSLETTERS_EDIT: (newsletterId: string) =>
    `/admin/publishing/newsletters/${newsletterId}/edit`,
  PUBLISHING_ARTICLES: "/admin/publishing/articles",
  PUBLISHING_ARTICLES_NEW: "/admin/publishing/articles/new",
  PUBLISHING_ARTICLES_EDIT: (articleId: string) => `/admin/publishing/articles/${articleId}/edit`,
};

export { AppRoutes };
