import * as React from "react";
import { Button, Header, Text, TextInput, useSaveable } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { updateSchedule } from "../schedules/ScheduleActions";

import styles from "./SettingsDashboard.module.css";

export default function SettingsStreamTemplates() {
  const dispatch = useSafeDispatch();
  const { schedule } = React.useContext(CurrentScheduleContext);

  const [runTitleTemplate, setRunTemplate] = React.useState(schedule.runTitleTemplate);
  const [interviewTitleTemplate, setInterviewTemplate] = React.useState(
    schedule.interviewTitleTemplate,
  );
  const [breakTitleTemplate, setBreakTemplate] = React.useState(schedule.breakTitleTemplate);

  React.useLayoutEffect(() => {
    setRunTemplate(schedule.runTitleTemplate);
    setInterviewTemplate(schedule.interviewTitleTemplate);
    setBreakTemplate(schedule.breakTitleTemplate);
  }, [schedule]);

  const [handleSave, getSaveText] = useSaveable(async () => {
    dispatch(
      updateSchedule({
        ...schedule,
        runTitleTemplate,
        interviewTitleTemplate,
        breakTitleTemplate,
      }),
    );
  });

  return (
    <div className={styles.section}>
      <Header size={Header.Sizes.H2}>Stream Titles</Header>
      <Text>
        Use these templates to automatically set the Stream Title on Twitch based on the current
        schedule entry.
        <br />
        Interpolate values into the strings with <code>{"{{ value }}"}</code>.
      </Text>
      <TextInput
        label="Run Title Template"
        note="Available values are: gameName, categoryName, runners."
        value={runTitleTemplate}
        onChange={(event) => setRunTemplate(event.target.value)}
      />
      <TextInput
        label="Interview Title Template"
        note="Available values are: interviewees, interviewers."
        value={interviewTitleTemplate}
        onChange={(event) => setInterviewTemplate(event.target.value)}
        autoFocus
      />
      <TextInput
        label="Break Title Template"
        note="No available interpolations currently."
        value={breakTitleTemplate}
        onChange={(event) => setBreakTemplate(event.target.value)}
        autoFocus
      />
      <Button className={styles.setCurrentButton} onClick={handleSave}>
        {getSaveText()}
      </Button>
    </div>
  );
}
