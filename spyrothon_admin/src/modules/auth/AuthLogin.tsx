import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, FormControl, Header, Spacer, Stack, TextInput } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { Routes } from "../../Constants";
import { useSafeSelector } from "../../Store";
import { login } from "./AuthActions";
import AuthStore from "./AuthStore";

import styles from "./AuthLogin.module.css";

export default function AuthLogin() {
  const dispatch = useSafeDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSafeSelector((state) => AuthStore.isLoggedIn(state));

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate(Routes.LIVE_DASHBOARD, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  function handleSubmit() {
    dispatch(login(userName, password));
  }

  return (
    <div className={styles.positioner}>
      <Card className={styles.box}>
        <Stack spacing="space-lg">
          <Header tag="h1">Login</Header>
          <FormControl label="User Name">
            <TextInput
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              autoFocus
            />
          </FormControl>
          <FormControl label="Password">
            <TextInput
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Spacer />
          <Button variant="primary" onClick={handleSubmit}>
            Login
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
