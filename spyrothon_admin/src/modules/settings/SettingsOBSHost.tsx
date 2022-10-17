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

import { useSafeSelector } from "../../Store";
import CurrentScheduleContext from "../schedules/CurrentScheduleContext";
import { fetchScheduleOBSConfig, updateScheduleOBSConfig } from "../schedules/ScheduleActions";
import * as ScheduleStore from "../schedules/ScheduleStore";

export default function ConfigOBSHost() {
  const dispatch = useSafeDispatch();
  const { scheduleId } = React.useContext(CurrentScheduleContext);

  React.useEffect(() => {
    dispatch(fetchScheduleOBSConfig(scheduleId));
  }, [dispatch, scheduleId]);

  const obsConfig = useSafeSelector(ScheduleStore.getOBSConfig);
  const [host, setHost] = React.useState(obsConfig?.host || "");
  const [port, setPort] = React.useState(obsConfig?.port || 4000);
  const [password, setPassword] = React.useState(obsConfig?.password || "");
  React.useEffect(() => {
    if (obsConfig == null) return;

    setHost(obsConfig.host);
    setPort(obsConfig.port);
    setPassword(obsConfig.password);
  }, [obsConfig]);

  const [handleSave, getSaveText] = useSaveable(async () => {
    dispatch(updateScheduleOBSConfig(scheduleId, { ...obsConfig, host, port, password }));
  });

  return (
    <Section>
      <Stack spacing="space-lg">
        <div>
          <Header tag="h2">OBS Websocket Host</Header>
          <Text>
            This information is used to connect to the OBS instance running graphics for the stream.
          </Text>
        </div>
        <Card>
          <Stack spacing="space-lg">
            <FormControl
              label="Host"
              note="EX: localhost, eventwebsite.org. Do not include a protocol or port number here">
              <TextInput value={host} onChange={(event) => setHost(event.target.value)} />
            </FormControl>
            <FormControl label="Port" note="Must be a valid port number [0-65535].">
              <TextInput
                type="number"
                value={port}
                onChange={(event) => setPort(Number(event.target.value))}
              />
            </FormControl>
            <FormControl
              label="Password"
              note="Use a password to prevent random people from connecting to OBS.">
              <TextInput value={password} onChange={(event) => setPassword(event.target.value)} />
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
