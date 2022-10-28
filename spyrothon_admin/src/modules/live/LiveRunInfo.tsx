import * as React from "react";
import classNames from "classnames";
import type { Run } from "@spyrothon/api";
import { Button, Card, FormControl, Header, Stack, TextArea } from "@spyrothon/sparx";

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
    <Card className={classNames(className)}>
      <Stack spacing="space-lg">
        <Header tag="h4" variant="header-md/normal">
          Layout Run Info
        </Header>
        <FormControl
          label="Formatted Game Name"
          note="Use newlines to adjust how the game name looks on stream.">
          <TextArea
            value={gameNameFormatted}
            rows={2}
            onChange={(event) => setGameNameFormatted(event.target.value)}
          />
        </FormControl>
        <Button variant="primary" onClick={handleSave} disabled={!hasChanges}>
          Save Game Info
        </Button>
      </Stack>
    </Card>
  );
}
