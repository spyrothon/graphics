import * as React from "react";
import { APIClient, ScheduleResponse } from "@spyrothon/api";
import { Header } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { setCurrentSchedule } from "../schedules/ScheduleActions";
import ScheduleCard from "../schedules/ScheduleCard";

import styles from "./SettingsGeneral.module.css";

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();
  const { schedule: currentSchedule } = React.useContext(CurrentScheduleContext);

  const [schedules, setSchedules] = React.useState<ScheduleResponse[]>([]);

  React.useEffect(() => {
    APIClient.fetchSchedules().then((data) => setSchedules(data));
  }, [currentSchedule]);

  return (
    <div className={styles.section}>
      <Header size={Header.Sizes.H2}>Select a Schedule</Header>

      {schedules.map((schedule) => (
        <ScheduleCard
          className={styles.scheduleCard}
          key={schedule.id}
          schedule={schedule}
          onSelect={() => dispatch(setCurrentSchedule(schedule))}
        />
      ))}
    </div>
  );
}
