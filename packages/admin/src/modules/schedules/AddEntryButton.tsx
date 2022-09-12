import * as React from "react";
import { Text } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";
import { addRunToSchedule, addInterviewToSchedule } from "./ScheduleActions";

import styles from "./ScheduleList.module.css";
import CurrentScheduleContext from "./CurrentScheduleContext";

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
    <div className={styles.addButtons}>
      <div className={styles.addButton} onClick={handleAddRun}>
        <Text className={styles.addButtonText}>+ Add a Run</Text>
      </div>
      <div className={styles.addButton} onClick={handleAddInterview}>
        <Text className={styles.addButtonText}>+ Add an Interview</Text>
      </div>
    </div>
  );
}
