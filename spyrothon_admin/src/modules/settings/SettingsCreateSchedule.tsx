import * as React from "react";
import { InitialSchedule } from "@spyrothon/api";
import { Button, Card, FormControl, Header, Section, Stack, TextInput } from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { createSchedule } from "../schedules/ScheduleActions";

// This is hideous, but `datetime-local` doesn't accept timezones...
function toDatetimeLocal(date?: Date) {
  if (date == null) return "";

  const tzOffset = date.getTimezoneOffset();
  const localized = new Date(date);
  localized.setMinutes(date.getMinutes() + tzOffset);
  return localized.toISOString().slice(0, 16);
}

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
                <TextInput
                  type="datetime-local"
                  required
                  value={toDatetimeLocal(editedSchedule.startTime)}
                  onChange={(startTime) =>
                    setEditedSchedule({
                      ...editedSchedule,
                      startTime: new Date(startTime.target.value),
                    })
                  }
                />
              </FormControl>
              <FormControl label="End Time">
                <TextInput
                  type="datetime-local"
                  value={toDatetimeLocal(editedSchedule.endTime)}
                  onChange={(endTime) =>
                    setEditedSchedule({
                      ...editedSchedule,
                      endTime: new Date(endTime.target.value),
                    })
                  }
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
