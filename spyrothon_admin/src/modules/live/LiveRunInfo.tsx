import * as React from "react";
import classNames from "classnames";
import type { Run } from "@spyrothon/api";
import { Button, Header, TextInput } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { persistRun } from "../runs/RunActions";

type LiveRunInfoProps = {
  run: Run;
  className?: string;
};

export default function LiveRunInfo(props: LiveRunInfoProps) {
  const { run, className } = props;
  const dispatch = useSafeDispatch();

  const [gameNameFormatted, setGameNameFormatted] = React.useState(run.gameNameFormatted);
  const hasChanges = gameNameFormatted !== run.gameNameFormatted;

  React.useEffect(() => {
    setGameNameFormatted(run.gameNameFormatted);
  }, [run]);

  function handleSave() {
    dispatch(persistRun(run.id, { gameNameFormatted }));
  }

  return (
    <div className={classNames(className)}>
      <Header size={Header.Sizes.H4}>Layout Run Info</Header>
      <TextInput
        type="textarea"
        label="Formatted Game Name"
        note="Use newlines to adjust how the game name looks on stream."
        value={gameNameFormatted}
        rows={2}
        onChange={(event) => setGameNameFormatted(event.target.value)}
      />
      <Button onClick={handleSave} disabled={!hasChanges}>
        Save Game Info
      </Button>
    </div>
  );
}
