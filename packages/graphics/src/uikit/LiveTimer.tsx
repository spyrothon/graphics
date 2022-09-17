import * as React from "react";
import { Run } from "@spyrothon/api";

import { useAnimationFrame } from "@graphics/hooks/useAnimationFrame";

import getElapsedRunSeconds from "../modules/runs/getElapsedRunSeconds";
import * as DurationUtils from "../modules/time/DurationUtils";

interface LiveTimerProps {
  run: Run;
  runnerId?: string;
  asOf?: Date;
}

export default function LiveTimer(props: LiveTimerProps) {
  const { run, runnerId, asOf } = props;
  const [time, setTime] = React.useState(() => getElapsedRunSeconds(run, runnerId, asOf));

  useAnimationFrame(() => {
    return setTime(getElapsedRunSeconds(run, runnerId, asOf));
  }, [run, runnerId, asOf]);

  return <>{DurationUtils.toString(time)}</>;
}
