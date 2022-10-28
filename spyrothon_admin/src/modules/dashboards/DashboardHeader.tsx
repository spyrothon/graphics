import * as React from "react";
import { Anchor, Card, Header, Stack, Text } from "@spyrothon/sparx";

import { Routes } from "../../Constants";
import RemoteConnectionStatus from "../connection/RemoteConnectionStatus";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";

import styles from "./DashboardHeader.module.css";

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
          <Anchor buttonVariant="link" href={Routes.SCHEDULE_EDITOR}>
            Schedule Editor
          </Anchor>
          <Anchor buttonVariant="link" href={Routes.LIVE_DASHBOARD}>
            Live Dashboard
          </Anchor>
          <Anchor buttonVariant="link" href={Routes.SETTINGS}>
            Settings
          </Anchor>
          <Anchor buttonVariant="link" href={Routes.PUBLISHING}>
            Publishing
          </Anchor>
        </Stack>
        <div className={styles.right}>
          <RemoteConnectionStatus />
        </div>
      </Stack>
    </Card>
  );
}
