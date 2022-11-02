import * as React from "react";
import { Airplay, Edit, Settings, Twitch, User, Users } from "react-feather";

import { Routes } from "../../Constants";
import { DashboardSidebarRoute } from "../dashboards/DashboardSidebar";
import SettingsGeneral from "./SettingsGeneral";
import SettingsManageSchedule from "./SettingsManageSchedule";
import SettingsOBSHost from "./SettingsOBSHost";
import SettingsParticipants from "./SettingsParticipants";
import SettingsStreamTemplates from "./SettingsStreamTemplates";
import SettingsUser from "./SettingsUser";

const SETTINGS_ROUTES: DashboardSidebarRoute[] = [
  {
    id: "general",
    icon: Settings,
    label: "General",
    path: Routes.SETTINGS,
    element: <SettingsGeneral />,
  },
  {
    id: "manage-schedule",
    icon: Edit,
    label: "Manage Schedule",
    path: Routes.SETTINGS_MANAGE_SCHEDULE,
    element: <SettingsManageSchedule />,
  },
  {
    id: "participants",
    icon: Users,
    label: "Participants",
    path: Routes.SETTINGS_PARTICIPANTS,
    element: <SettingsParticipants />,
  },
  {
    id: "obs",
    icon: Airplay,
    label: "OBS Remote",
    path: Routes.SETTINGS_OBS,
    element: <SettingsOBSHost />,
  },
  {
    id: "twitch",
    icon: Twitch,
    label: "Twitch",
    path: Routes.SETTINGS_TWITCH,
    element: <SettingsStreamTemplates />,
  },
  {
    id: "user",
    icon: User,
    label: "User Settings",
    path: Routes.SETTINGS_USER,
    element: <SettingsUser />,
  },
];

export default SETTINGS_ROUTES;
