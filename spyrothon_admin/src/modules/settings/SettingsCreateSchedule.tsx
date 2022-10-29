import * as React from "react";
import { InitialSchedule } from "@spyrothon/api";
import {
  Button,
  Card,
  DateTimeInput,
  FormControl,
  Header,
  Section,
  Stack,
  TextInput,
} from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { createSchedule } from "../schedules/ScheduleActions";

export default function SettingsGeneral() {
  const dispatch = useSafeDispatch();

  const [editedSchedule, setEditedSchedule] = React.useState<InitialSchedule>({});
  const [handleSave, getSaveText] = useSaveable(async () => {
    await dispatch(createSchedule(editedSchedule));
  });

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Create a New Schedule</Header>
        <Card>
          <Stack spacing="space-lg">
            <FormControl label="Event Name">
              <TextInput
                required
                value={editedSchedule.name}
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, name: event.target.value })
                }
              />
            </FormControl>
            <FormControl label="Event Series">
              <TextInput
                value={editedSchedule.series}
                required
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, series: event.target.value })
                }
              />
            </FormControl>

            <Stack direction="horizontal" justify="stretch">
              <FormControl label="Start Time">
                <DateTimeInput
                  required
                  value={editedSchedule.startTime}
                  onChange={(startTime) => setEditedSchedule({ ...editedSchedule, startTime })}
                />
              </FormControl>
              <FormControl label="End Time">
                <DateTimeInput
                  value={editedSchedule.endTime}
                  onChange={(endTime) => setEditedSchedule({ ...editedSchedule, endTime })}
                />
              </FormControl>
            </Stack>

            <FormControl label="Twitch URL">
              <TextInput
                value={editedSchedule.twitchUrl}
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, twitchUrl: event.target.value })
                }
              />
            </FormControl>
            <FormControl label="Logo URL">
              <TextInput
                value={editedSchedule.logoUrl}
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, logoUrl: event.target.value })
                }
              />
            </FormControl>
          </Stack>
        </Card>
        <Button variant="primary" onClick={handleSave}>
          {getSaveText()}
        </Button>
      </Stack>
    </Section>
  );
}
