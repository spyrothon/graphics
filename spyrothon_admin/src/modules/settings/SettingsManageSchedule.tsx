import * as React from "react";
import { Schedule } from "@spyrothon/api";
import { Button, DateTimeInput, Header, TextInput, useSaveable } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { updateSchedule } from "../schedules/ScheduleActions";

import styles from "./SettingsManageSchedule.module.css";

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
    <div>
      <Header size={Header.Sizes.H2}>Create a New Schedule</Header>
      <TextInput
        label="Event Name"
        value={editedSchedule.name}
        required
        onChange={(event) => setEditedSchedule({ ...editedSchedule, name: event.target.value })}
      />
      <TextInput
        label="Event Series"
        value={editedSchedule.series}
        required
        onChange={(event) => setEditedSchedule({ ...editedSchedule, series: event.target.value })}
      />
      <div className={styles.dates}>
        <DateTimeInput
          className={styles.date}
          label="Start Time"
          required
          value={editedSchedule.startTime}
          onChange={(startTime) => setEditedSchedule({ ...editedSchedule, startTime })}
        />
        <DateTimeInput
          className={styles.date}
          label="End Time"
          value={editedSchedule.endTime}
          onChange={(endTime) => setEditedSchedule({ ...editedSchedule, endTime })}
        />
      </div>
      <TextInput
        label="Twitch URL"
        value={editedSchedule.twitchUrl}
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, twitchUrl: event.target.value })
        }
      />
      <TextInput
        label="Logo URL"
        value={editedSchedule.logoUrl}
        onChange={(event) => setEditedSchedule({ ...editedSchedule, logoUrl: event.target.value })}
      />
      <TextInput
        label="RTMP Host"
        value={editedSchedule.rtmpHost}
        onChange={(event) => setEditedSchedule({ ...editedSchedule, rtmpHost: event.target.value })}
      />

      <hr style={{ margin: "48px 0" }} />
      <Header size={Header.Sizes.H3}>Break Screen Taglines</Header>
      <TextInput
        label="Break Left Title"
        value={editedSchedule.breakLeftTitle}
        placeholder="Stay fired up, Bob"
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, breakLeftTitle: event.target.value })
        }
      />
      <TextInput
        label="Break Left Subtitle"
        value={editedSchedule.breakLeftSubtitle}
        placeholder="We'll be right back"
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, breakLeftSubtitle: event.target.value })
        }
      />

      <TextInput
        label="Break Right Title"
        value={editedSchedule.breakRightTitle}
        placeholder="Stay fired up, Bob"
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, breakRightTitle: event.target.value })
        }
      />
      <TextInput
        label="Break Right Subtitle"
        value={editedSchedule.breakRightSubtitle}
        placeholder="We'll be right back"
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, breakRightSubtitle: event.target.value })
        }
      />

      <TextInput
        label="Outro Title"
        value={editedSchedule.outroTitle}
        placeholder="See you again next time"
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, outroTitle: event.target.value })
        }
      />
      <TextInput
        label="Outro Subtitle"
        value={editedSchedule.outroSubtitle}
        onChange={(event) =>
          setEditedSchedule({ ...editedSchedule, outroSubtitle: event.target.value })
        }
      />

      <Button onClick={handleSave}>{getSaveText()}</Button>
    </div>
  );
}
