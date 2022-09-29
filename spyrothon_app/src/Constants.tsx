export const Routes = {
  BASE_PATH: "/",
  SCHEDULE: "/schedule",

  NEWSLETTERS: "/newsletters",
  NEWSLETTER: (newsletterId: string) => `/newsletters/${newsletterId}`,
};
