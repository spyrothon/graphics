import * as React from "react";
import { Button, Card, Stack } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "./CurrentScheduleContext";
import { addInterviewToSchedule, addRunToSchedule } from "./ScheduleActions";

import styles from "./ScheduleList.module.css";

export default function AddEntryButtons() {
  const dispatch = useSafeDispatch();
  const { scheduleId } = React.useContext(CurrentScheduleContext);

  function handleAddRun() {
    dispatch(addRunToSchedule(scheduleId));
  }

  function handleAddInterview() {
    dispatch(addInterviewToSchedule(scheduleId));
  }

  return (
    <Card className={styles.addButtons}>
      <Stack>
        <Button variant="primary" onClick={handleAddRun}>
          + Add a Run
        </Button>
        <Button variant="primary/outline" onClick={handleAddInterview}>
          + Add an Interview
        </Button>
      </Stack>
    </Card>
  );
}
