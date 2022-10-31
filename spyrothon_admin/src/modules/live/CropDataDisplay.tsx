import * as React from "react";
import { CropTransform } from "@spyrothon/api";
import { Text } from "@spyrothon/sparx";

import styles from "./CropDataDisplay.module.css";

interface CropDataDisplayProps {
  transform: CropTransform;
}

export default function CropDataDisplay(props: CropDataDisplayProps) {
  const { transform } = props;

  return (
    <div className={styles.grid}>
      <div className={styles.top}>
        <Text>{transform.top}</Text>
      </div>
      <div className={styles.right}>
        <Text>{transform.right}</Text>
      </div>
      <div className={styles.middle} />
      <div className={styles.bottom}>
        <Text>{transform.bottom}</Text>
      </div>
      <div className={styles.left}>
        <Text>{transform.left}</Text>
      </div>
    </div>
  );
}
