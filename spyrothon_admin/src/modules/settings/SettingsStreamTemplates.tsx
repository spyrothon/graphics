import * as React from "react";
import {
  Button,
  Card,
  FormControl,
  Header,
  Section,
  Stack,
  Text,
  TextInput,
} from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";

import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { updateSchedule } from "../schedules/ScheduleActions";

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
    <Section>
      <Stack spacing="space-lg">
        <div>
          <Header tag="h2">Stream Titles</Header>
          <Text>
            Use these templates to automatically set the Stream Title on Twitch based on the current
            schedule entry.
            <br />
            Interpolate values into the strings with <code>{"{{ value }}"}</code>.
          </Text>
        </div>
        <Card>
          <Stack spacing="space-lg">
            <FormControl
              label="Run Title Template"
              note="Available values are: gameName, categoryName, runners.">
              <TextInput
                value={runTitleTemplate}
                onChange={(event) => setRunTemplate(event.target.value)}
              />
            </FormControl>
            <FormControl
              label="Interview Title Template"
              note="Available values are: interviewees, interviewers.">
              <TextInput
                value={interviewTitleTemplate}
                onChange={(event) => setInterviewTemplate(event.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl label="Break Title Template" note="No available interpolations currently.">
              <TextInput
                value={breakTitleTemplate}
                onChange={(event) => setBreakTemplate(event.target.value)}
                autoFocus
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
