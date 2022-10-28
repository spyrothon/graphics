import * as React from "react";
import { Schedule } from "@spyrothon/api";
import { Button, Card, FormControl, Header, Section, Stack, TextInput } from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { updateSchedule } from "../schedules/ScheduleActions";

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

  const { schedule } = React.useContext(CurrentScheduleContext);
  const [editedSchedule, setEditedSchedule] = React.useState<Schedule>(schedule);

  React.useEffect(() => {
    setEditedSchedule(schedule);
  }, [schedule]);

  const [handleSave, getSaveText] = useSaveable(async () => {
    await dispatch(updateSchedule(editedSchedule));
  });

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">Edit Schedule</Header>
        <Card>
          <Stack spacing="space-lg">
            <FormControl label="Event Name">
              <TextInput
                value={editedSchedule.name}
                required
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
            <FormControl label="RTMP Host">
              <TextInput
                value={editedSchedule.rtmpHost}
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, rtmpHost: event.target.value })
                }
              />
            </FormControl>
          </Stack>
        </Card>
        <Button variant="primary" onClick={handleSave}>
          {getSaveText()}
        </Button>

        <hr style={{ margin: "48px 0" }} />
        <Header tag="h2">Break Screen Taglines</Header>

        <Card>
          <Stack spacing="space-lg">
            <FormControl label="Break Left Title">
              <TextInput
                value={editedSchedule.breakLeftTitle}
                placeholder="Stay fired up, Bob"
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, breakLeftTitle: event.target.value })
                }
              />
            </FormControl>
            <FormControl label="Break Left Subtitle">
              <TextInput
                value={editedSchedule.breakLeftSubtitle}
                placeholder="We'll be right back"
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, breakLeftSubtitle: event.target.value })
                }
              />
            </FormControl>

            <FormControl label="Break Right Title">
              <TextInput
                value={editedSchedule.breakRightTitle}
                placeholder="Stay fired up, Bob"
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, breakRightTitle: event.target.value })
                }
              />
            </FormControl>
            <FormControl label="Break Right Subtitle">
              <TextInput
                value={editedSchedule.breakRightSubtitle}
                placeholder="We'll be right back"
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, breakRightSubtitle: event.target.value })
                }
              />
            </FormControl>

            <FormControl label="Outro Title">
              <TextInput
                value={editedSchedule.outroTitle}
                placeholder="See you again next time"
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, outroTitle: event.target.value })
                }
              />
            </FormControl>
            <FormControl label="Outro Subtitle">
              <TextInput
                value={editedSchedule.outroSubtitle}
                onChange={(event) =>
                  setEditedSchedule({ ...editedSchedule, outroSubtitle: event.target.value })
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
