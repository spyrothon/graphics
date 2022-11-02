import * as React from "react";
import { ScheduleResponse } from "@spyrothon/api";
import { Button, Header, openModal, Spacer, Stack } from "@spyrothon/sparx";

import API from "@admin/API";
import useSafeDispatch from "@admin/hooks/useDispatch";

import CreateScheduleModal from "../schedules/CreateScheduleModal";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { setCurrentSchedule } from "../schedules/ScheduleActions";
import ScheduleCard from "../schedules/ScheduleCard";

type GroupedSchedules = Record<string, ScheduleResponse[]>;

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();
  const { schedule: currentSchedule } = React.useContext(CurrentScheduleContext);

  const [groupedSchedules, setSchedules] = React.useState<GroupedSchedules>({});

  React.useEffect(() => {
    (async () => {
      const data = await API.schedules.fetchSchedules();

      const grouped = data.reduce((acc, schedule) => {
        acc[schedule.series] = acc[schedule.series] ?? [];
        acc[schedule.series].push(schedule);
        // @ts-expect-error it doesn't like comparing Dates.
        acc[schedule.series].sort((a, b) => b.startTime - a.startTime);
        return acc;
      }, {} as GroupedSchedules);

      setSchedules(grouped);
    })();
  }, [currentSchedule]);

  function handleCreateSchedule() {
    openModal((props) => <CreateScheduleModal {...props} />);
  }

  return (
    <Stack spacing="space-lg">
      <div>
        <Button variant="primary" onClick={handleCreateSchedule}>
          Create New Schedule
        </Button>
      </div>

      {Object.entries(groupedSchedules).map(([group, schedules]) => (
        <>
          <Header tag="h1">{group}</Header>
          <Stack key={group} direction="horizontal" justify="stretch">
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                onSelect={() => dispatch(setCurrentSchedule(schedule))}
              />
            ))}
          </Stack>
          <Spacer size="space-md" />
        </>
      ))}
    </Stack>
  );
}
