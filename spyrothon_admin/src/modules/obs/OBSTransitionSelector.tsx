import * as React from "react";
import { SelectInput } from "@spyrothon/uikit";

import { useOBSStore } from "./OBSStore";
import type { OBSTransition } from "./OBSTypes";

type OBSTransitionSelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedTransitionName?: string;
  marginless?: boolean;
  className?: string;
  onChange: (entry?: OBSTransition) => unknown;
};

export default function OBSTransitionSelector(props: OBSTransitionSelectorProps) {
  const {
    label = "OBS Transition",
    note = "Name of the transition to use in OBS.",
    selectedTransitionName,
    marginless,
    className,
    onChange,
  } = props;
  const transitions = useOBSStore((state) => state.data.transitionList);

  const selected = React.useMemo(
    () => transitions.find((entry) => entry.transitionName === selectedTransitionName),
    [selectedTransitionName, transitions],
  );

  return (
    <SelectInput
      label={label}
      note={note}
      className={className}
      items={transitions}
      itemToString={(entry) => entry?.transitionName ?? "(unnamed)"}
      value={selected}
      marginless={marginless}
      allowEmpty
      emptyLabel="Select an OBS Transition"
      onChange={onChange}
    />
  );
}
