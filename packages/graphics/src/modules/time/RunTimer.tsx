import * as React from "react";
import { Run } from "@spyrothon/api";

import { useAnimationFrame } from "@graphics/hooks/useAnimationFrame";
import Timer from "@graphics/uikit/Timer";

import getElapsedRunSeconds from "../runs/getElapsedRunSeconds";

interface RunTimerProps {
  run: Run;
  runnerId?: string;
  asOf?: Date;
  className?: string;
}

export default function RunTimer(props: RunTimerProps) {
  const { run, runnerId, asOf, className } = props;
  const [time, setTime] = React.useState(() => getElapsedRunSeconds(run, runnerId, asOf));

  useAnimationFrame(() => {
    return setTime(getElapsedRunSeconds(run, runnerId, asOf));
  }, [run, runnerId, asOf]);

  return <Timer elapsedSeconds={time} className={className} />;
}
