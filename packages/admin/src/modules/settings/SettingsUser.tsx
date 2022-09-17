import * as React from "react";
import { Button, Header, TextInput, useSaveable } from "@spyrothon/uikit";

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
    dispatch(updateMe(editedUser, password));
  });

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

  return (
    <div>
      <Header>User Settings</Header>
      <TextInput
        label="Name"
        value={editedUser.name}
        onChange={(event) => setEditedUser({ ...editedUser, name: event.target.value })}
      />
      <TextInput
        type="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button onClick={handleSave} disabled={password.length === 0}>
        {getSaveText()}
      </Button>
    </div>
  );
}
