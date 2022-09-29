import * as React from "react";

import Omnibar from "@graphics/modules/omnibar/Omnibar";
import Layout from "@graphics/uikit/Layout";

import styles from "./InterviewOpen.module.css";

export default function InterviewOpen() {
  return (
    <Layout>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
