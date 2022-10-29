import * as React from "react";
import { Icon, LogOut } from "react-feather";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { Anchor, Card, Stack, Tabs, Text } from "@spyrothon/sparx";

import { Routes } from "../../Constants";
import { useSafeSelector } from "../../Store";
import AuthStore from "../auth/AuthStore";

const ICON_STYLE = { marginRight: 8, marginBottom: -2.5 };

export interface DashboardSidebarRoute extends RouteObject {
  id: string;
  icon?: Icon;
  path: string;
  label: React.ReactNode;
  showLink?: boolean;
}

interface DashboardSidebarProps {
  routes: DashboardSidebarRoute[];
  className?: string;
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  const { routes, className } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = useSafeSelector(AuthStore.getUser);

  return (
    <Card className={className}>
      <Stack spacing="space-xl">
        <Tabs.Group>
          {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            routes.map(({ id, path, label, icon: Icon, showLink = true }) =>
              showLink ? (
                <Tabs.Tab
                  key={id}
                  selected={location.pathname === path}
                  icon={
                    Icon != null
                      ? (props) => <Icon size={18} strokeWidth="2" style={ICON_STYLE} {...props} />
                      : undefined
                  }
                  label={<>{label}</>}
                  onClick={() => navigate(path)}></Tabs.Tab>
              ) : null,
            )
          }
        </Tabs.Group>
        <div>
          <Anchor href={Routes.LOGOUT}>
            <LogOut size={18} strokeWidth="2" style={ICON_STYLE} />
            Logout
          </Anchor>
          <Text variant="text-xs/normal">
            Logged in as <strong>{currentUser?.name}</strong>
          </Text>
        </div>
      </Stack>
    </Card>
  );
}
