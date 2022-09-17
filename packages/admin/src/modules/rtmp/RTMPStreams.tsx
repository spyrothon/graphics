import * as React from "react";
import classNames from "classnames";
import { formatDuration, Header, Text } from "@spyrothon/uikit";

import getRTMPStats, { RTMPStream } from "./getRTMPStats";

import styles from "./RTMPStreams.module.css";

const STAT_REFRESH_INTERVAL = 15000;

function RTMPStreamStat({ stream }: { stream: RTMPStream }) {
  const {
    streamKey,
    uptimeMillis,
    audioBitrate,
    videoBitrate,
    videoHeight,
    videoWidth,
    frameRate,
  } = stream;

  return (
    <div className={styles.stream}>
      <Text className={styles.streamKey} marginless>
        {streamKey}
        {uptimeMillis != null ? (
          <span className={styles.uptime}>
            {" - "}
            {formatDuration(uptimeMillis / 1000)}
          </span>
        ) : null}
      </Text>
      <Text color={Text.Colors.MUTED} size={Text.Sizes.SIZE_14} marginless>
        <span className={styles.bitrate}>
          {videoBitrate != null ? `Video: ${(videoBitrate / 1000).toFixed(0)}kbps` : null}
        </span>
        <span className={styles.bitrate}>
          {audioBitrate != null ? `Audio: ${(audioBitrate / 1000).toFixed(0)}kbps` : null}
        </span>
      </Text>
      <Text color={Text.Colors.MUTED} size={Text.Sizes.SIZE_14} marginless>
        Resolution: {videoWidth}x{videoHeight} @ {frameRate}fps
      </Text>
    </div>
  );
}

interface RTMPStreamsProps {
  scheduleId: string;
  className?: string;
}

export default function RTMPStreams(props: RTMPStreamsProps) {
  const { scheduleId, className } = props;

  const [streams, setStreams] = React.useState<RTMPStream[]>([]);
  React.useEffect(() => {
    async function fetchStreams() {
      const streams = await getRTMPStats(scheduleId);
      setStreams(streams);
    }

    const intervalId = setInterval(fetchStreams, STAT_REFRESH_INTERVAL);
    fetchStreams();

    return () => clearInterval(intervalId);
  }, [scheduleId]);

  return (
    <div className={classNames(styles.container, className)}>
      <Header size={Header.Sizes.H4}>RTMP Stats</Header>
      {streams.map((stream) => (
        <RTMPStreamStat key={stream.streamKey} stream={stream} />
      ))}
    </div>
  );
}
