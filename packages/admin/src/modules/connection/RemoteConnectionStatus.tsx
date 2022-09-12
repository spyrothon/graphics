import * as React from "react";
import { Header, StatusDot } from "@spyrothon/uikit";

import styles from "./RemoteConnectionStatus.module.css";
import { useOBSConnected, useOBSBusy } from "../obs/OBSStore";
import SyncSocketManager from "../sync/SyncSocketManager";

export default function RemoteConnectionStatus() {
  const [obsConnected] = useOBSConnected();
  const { busy: obsBusy } = useOBSBusy();

  const [isConnected, setConnected] = React.useState(() => SyncSocketManager.isConnected);
  React.useEffect(() => {
    const unsubscribe = SyncSocketManager.addConnectionListener(setConnected);
    return unsubscribe;
  }, []);

  return (
    <div className={styles.container}>
      <Header size={Header.Sizes.H5} marginless>
        Connections
      </Header>
      <div className={styles.items}>
        <div className={styles.item}>
          <StatusDot boolean={isConnected} />
          <span className={styles.itemName}>API Sync</span>
        </div>
        <div className={styles.item}>
          <StatusDot boolean={obsConnected} busy={obsBusy} />
          <span className={styles.itemName}>OBS</span>
        </div>
      </div>
    </div>
  );
}
