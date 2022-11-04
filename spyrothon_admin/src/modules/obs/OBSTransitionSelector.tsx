import * as React from "react";
import { FormControl, SelectInput, Text } from "@spyrothon/sparx";

import { useOBSStore } from "./OBSStore";
import type { OBSTransition } from "./OBSTypes";

type OBSTransitionSelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedTransitionName?: string;
  className?: string;
  onSelect: (entry?: OBSTransition) => unknown;
};

export default function OBSTransitionSelector(props: OBSTransitionSelectorProps) {
  const {
    label = "OBS Transition",
    note = "Name of the transition to use in OBS.",
    selectedTransitionName,
    className,
    onSelect,
  } = props;
  const transitions = useOBSStore((state) => state.data.transitionList);
  const transitionOptions = transitions.map((transition) => ({
    name: transition.transitionName,
    value: transition,
  }));

  const selected = React.useMemo(
    () => transitionOptions.find((entry) => entry.name === selectedTransitionName),
    [selectedTransitionName, transitionOptions],
  );

  return (
    <FormControl label={label} note={note}>
      <SelectInput
        className={className}
        items={transitionOptions}
        renderItem={(entry) => <Text>{entry?.name ?? "(unnamed)"}</Text>}
        selectedItem={selected}
        renderPlaceholder={() => <Text>Select an OBS Transition</Text>}
        onSelect={(entry) => onSelect(entry?.value)}
      />
    </FormControl>
  );
}
