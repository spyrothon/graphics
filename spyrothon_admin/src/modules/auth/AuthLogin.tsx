import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, TextInput } from "@spyrothon/uikit";

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
    <div className={styles.container}>
      <div className={styles.box}>
        <Header>Login</Header>
        <TextInput
          label="User Name"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          autoFocus
        />
        <TextInput
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}
