import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "./Button";

type ButtonProps = React.ComponentProps<typeof Button>;

interface NavLinkProps extends ButtonProps {
  route: string;
  label: React.ReactNode;
  exact?: boolean;
  activeColor?: ButtonProps["color"];
}

export function NavLink(props: NavLinkProps) {
  const { route, label, exact, color, activeColor, ...buttonProps } = props;

  const location = useLocation();
  const isActive = exact ? location.pathname === route : location.pathname.startsWith(route);
  const navigate = useNavigate();

  function handleClick() {
    navigate(route);
  }

  const buttonColor = isActive
    ? activeColor ?? Button.Colors.PRIMARY
    : color ?? Button.Colors.DEFAULT;

  return (
    <Button {...buttonProps} onClick={isActive ? undefined : handleClick} color={buttonColor}>
      {label}
    </Button>
  );
}
