import * as React from "react";
import classNames from "classnames";

import type { Run } from "../../../api/APITypes";

import useSafeDispatch from "../../hooks/useDispatch";
import Button from "../../uikit/Button";
import Header from "../../uikit/Header";
import TextInput from "../../uikit/TextInput";
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
        label="Formatted Game Name"
        note="Use newlines to adjust how the game name looks on stream."
        value={gameNameFormatted}
        multiline
        // @ts-expect-error TextInput needs to handle textarea props
        rows={2}
        onChange={(event) => setGameNameFormatted(event.target.value)}
      />
      <Button onClick={handleSave} disabled={!hasChanges}>
        Save Game Info
      </Button>
    </div>
  );
}
