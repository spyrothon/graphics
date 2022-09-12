const Endpoints = {
  INIT: "/init",
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",
  // Interviews
  INTERVIEWS: "/interviews",
  INTERVIEW: (id: string) => `/interviews/${id}`,
  // Runs
  RUNS: "/runs",
  RUN: (id: string) => `/runs/${id}`,
  RUN_START: (id: string) => `/runs/${id}/start`,
  RUN_FINISH: (id: string) => `/runs/${id}/finish`,
  RUN_PAUSE: (id: string) => `/runs/${id}/pause`,
  RUN_RESUME: (id: string) => `/runs/${id}/resume`,
  RUN_RESET: (id: string) => `/runs/${id}/reset`,
  RUN_PARTICIPANT_FINISH: (id: string, participantId: string) =>
    `/runs/${id}/finish-participant/${participantId}`,
  RUN_PARTICIPANT_RESUME: (id: string, participantId: string) =>
    `/runs/${id}/resume-participant/${participantId}`,
  // Schedules
  SCHEDULES: "/schedules",
  SCHEDULE: (id: string) => `/schedules/${id}`,
  SCHEDULE_ENTRIES: (id: string) => `/schedules/${id}/entries`,
  SCHEDULE_TRANSITION: (id: string) => `/schedules/${id}/transition`,
  SCHEDULE_ENTRY: (scheduleId: string, entryId: string) =>
    `/schedules/${scheduleId}/entries/${entryId}`,
  SCHEDULE_SET_CURRENT_ENTRY: (id: string) => `/schedules/${id}/set-current-entry`,
  SCHEDULE_OBS_CONFIG: (id: string) => `/schedules/${id}/obs`,
  SCHEDULE_RTMP_STAT: (id: string) => `/schedules/${id}/rtmp-stat`,
  TRANSITION_SET_RESET: (id: string) => `/transition-sets/${id}/reset`,
  // Publishing
  NEWSLETTERS: `/newsletters`,
  NEWSLETTER: (id: string) => `/newsletters/${id}`,
  ARTICLES: `/articles`,
  ARTICLE: (id: string) => `/articles/${id}`,
};

export default Endpoints;
