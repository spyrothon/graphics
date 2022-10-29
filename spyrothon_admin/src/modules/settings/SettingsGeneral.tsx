import * as React from "react";
import { ScheduleResponse } from "@spyrothon/api";
import { Header, Stack } from "@spyrothon/sparx";

import API from "@admin/API";
import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { setCurrentSchedule } from "../schedules/ScheduleActions";
import ScheduleCard from "../schedules/ScheduleCard";

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();
  const { schedule: currentSchedule } = React.useContext(CurrentScheduleContext);

  const [schedules, setSchedules] = React.useState<ScheduleResponse[]>([]);

  React.useEffect(() => {
    API.schedules.fetchSchedules().then((data) => setSchedules(data));
  }, [currentSchedule]);

  return (
    <Stack spacing="space-lg">
      <Header tag="h2">Select a Schedule</Header>

      {schedules.map((schedule) => (
        <ScheduleCard
          key={schedule.id}
          schedule={schedule}
          onSelect={() => dispatch(setCurrentSchedule(schedule))}
        />
      ))}
    </Stack>
  );
}
