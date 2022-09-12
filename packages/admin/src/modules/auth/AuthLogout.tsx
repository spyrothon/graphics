import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Anchor } from "@spyrothon/uikit";

import useSafeDispatch from "@admin/hooks/useDispatch";
import { Routes } from "../../Constants";
import { logout } from "./AuthActions";

export default function AuthLogout() {
  const dispatch = useSafeDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(logout());
    navigate(Routes.LOGIN);
  }, []);

  return <Anchor onClick={() => navigate(Routes.LOGIN)}>Go Home</Anchor>;
}
