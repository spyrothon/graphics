import * as React from "react";
import { Header, Stack } from "@spyrothon/sparx";
import { StatusDot } from "@spyrothon/uikit";

import { useOBSBusy, useOBSConnected } from "../obs/OBSStore";
import SyncSocketManager from "../sync/SyncSocketManager";

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
        <div className={styles.item}>
          <StatusDot boolean={isConnected} />
          <span className={styles.itemName}>API Sync</span>
        </div>
        <div className={styles.item}>
          <StatusDot boolean={obsConnected} busy={obsBusy} />
          <span className={styles.itemName}>OBS</span>
        </div>
      </Stack>
    </Stack>
  );
}
