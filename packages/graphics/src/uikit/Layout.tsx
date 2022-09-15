import * as React from "react";
import classNames from "classnames";

import styles from "./Layout.module.css";

import backgroundVideo from "@graphics/res/BT1.mp4";

type LayoutProps = {
  className?: string;
  children: React.ReactNode;
  showBackground?: boolean;
};

export default function Layout(props: LayoutProps) {
  const { showBackground = true, className, children } = props;

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  React.useLayoutEffect(() => {
    if (videoRef.current == null) return;
    videoRef.current.playbackRate = 0.4;
  }, []);

  return (
    <div className={classNames(styles.layout, className)}>
      {showBackground ? (
        <video
          ref={videoRef}
          className={styles.background}
          preload="auto"
          muted
          playsInline
          autoPlay
          loop
          controls={false}>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
