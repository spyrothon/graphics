import * as React from "react";
import { User } from "@spyrothon/api";
import {
  Button,
  Card,
  FormControl,
  Header,
  Section,
  SelectInput,
  Stack,
  TextInput,
  Theme,
} from "@spyrothon/sparx";
import { useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
import { updateMe } from "../auth/AuthActions";
import AuthStore from "../auth/AuthStore";

export default function SettingsUser() {
  const dispatch = useSafeDispatch();

  // This has a non-null assertion because to be on this page you must be logged in.
  const user = useSafeSelector(AuthStore.getUser)!;
  const [editedUser, setEditedUser] = React.useState(user);
  const [password, setPassword] = React.useState("");

  const [handleSave, getSaveText] = useSaveable(async () => {
    dispatch(updateMe({ ...editedUser, password }));
  });

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

  function savePreference(changes: Partial<User>) {
    const edited = { ...user, ...changes };
    setEditedUser(edited);
    dispatch(updateMe(edited));
  }

  const themeOptions = [
    { name: "Dark", value: Theme.DARK },
    { name: "Light", value: Theme.LIGHT },
  ];
  const selectedTheme = themeOptions.find((option) => option.value === user.theme);

  return (
    <Section>
      <Stack spacing="space-lg">
        <Header tag="h2">User Settings</Header>
        <Card>
          <Stack spacing="space-lg">
            <FormControl label="Name">
              <TextInput
                value={editedUser.name}
                onChange={(event) => setEditedUser({ ...editedUser, name: event.target.value })}
              />
            </FormControl>
            <FormControl label="Password">
              <TextInput
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Button variant="primary" onClick={handleSave} disabled={password.length === 0}>
              {getSaveText()}
            </Button>
          </Stack>
        </Card>
        <Header tag="h2">Preferences</Header>
        <Card>
          <Stack spacing="space-lg">
            <FormControl label="App Theme">
              <SelectInput
                selectedItem={selectedTheme}
                items={themeOptions}
                onSelect={(item) => savePreference({ theme: item?.value })}
              />
            </FormControl>
          </Stack>
        </Card>
      </Stack>
    </Section>
  );
}
