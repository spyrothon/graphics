import * as React from "react";
import { Button } from "@spyrothon/uikit";

import { useOBSBusy } from "./OBSStore";

interface OBSButtonProps {
  busyText?: string;
}

export default function OBSButton(props: React.ComponentProps<typeof Button> & OBSButtonProps) {
  const { disabled, busyText, children } = props;

  const { busy } = useOBSBusy();

  return (
    <Button {...props} disabled={disabled || busy}>
      {busy ? busyText ?? children : children}
    </Button>
  );
}
