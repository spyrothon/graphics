import * as React from "react";
import { useLocation } from "react-router-dom";
import { Anchor, Card, Header, Stack, Text } from "@spyrothon/sparx";

import { Routes } from "../../Constants";
import RemoteConnectionStatus from "../connection/RemoteConnectionStatus";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";

import styles from "./DashboardHeader.module.css";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = href === location.pathname;

  return (
    <Anchor href={href} buttonVariant={isActive ? "primary/filled" : "link"}>
      {children}
    </Anchor>
  );
}

type DashboardHeaderProps = {
  name: React.ReactNode;
};

export default function DashboardHeader(props: DashboardHeaderProps) {
  const { name } = props;
  const { schedule } = React.useContext(CurrentScheduleContext);

  return (
    <Card>
      <Stack align="center" direction="horizontal" spacing="space-lg" className={styles.container}>
        <div className={styles.main}>
          <Header tag="h3" variant="header-md/normal">
            {name}
          </Header>
          <Text variant="text-sm/normal">{schedule.name}</Text>
        </div>
        <Stack align="center" direction="horizontal" spacing="space-lg" className={styles.pages}>
          <NavLink href={Routes.SCHEDULE_EDITOR}>Schedule Editor</NavLink>
          <NavLink href={Routes.LIVE_DASHBOARD}>Live Dashboard</NavLink>
          <NavLink href={Routes.SETTINGS}>Settings</NavLink>
          <NavLink href={Routes.PUBLISHING}>Publishing</NavLink>
        </Stack>
        <div className={styles.right}>
          <RemoteConnectionStatus />
        </div>
      </Stack>
    </Card>
  );
}
