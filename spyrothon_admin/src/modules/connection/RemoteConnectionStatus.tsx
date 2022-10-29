import * as React from "react";
import { Header, Stack, Text } from "@spyrothon/sparx";

import { useOBSBusy, useOBSConnected } from "../obs/OBSStore";
import SyncSocketManager from "../sync/SyncSocketManager";
import { StatusDot } from "./StatusDot";

import styles from "./RemoteConnectionStatus.module.css";

export default function RemoteConnectionStatus() {
  const [obsConnected] = useOBSConnected();
  const { busy: obsBusy } = useOBSBusy();

  const [isConnected, setConnected] = React.useState(() => SyncSocketManager.isConnected);
  React.useEffect(() => {
    const unsubscribe = SyncSocketManager.addConnectionListener(setConnected);
    return unsubscribe;
  }, []);

  return (
    <Stack spacing="space-none">
      <Header tag="h3" variant="header-sm/normal">
        Connections
      </Header>
      <Stack spacing="space-lg" direction="horizontal">
        <Text className={styles.item}>
          <StatusDot boolean={isConnected} />
          <span className={styles.itemName}>API Sync</span>
        </Text>
        <Text className={styles.item}>
          <StatusDot boolean={obsConnected} busy={obsBusy} />
          <span className={styles.itemName}>OBS</span>
        </Text>
      </Stack>
    </Stack>
  );
}
