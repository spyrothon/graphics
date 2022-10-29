import * as React from "react";
import { FormControl, SelectInput } from "@spyrothon/sparx";

import { useOBSStore } from "./OBSStore";
import type { OBSInput } from "./OBSTypes";

type OBSMediaSelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedMediaName?: string;
  className?: string;
  onSelect: (entry?: OBSInput) => unknown;
};

export default function OBSMediaSelector(props: OBSMediaSelectorProps) {
  const {
    label = "OBS Media Source",
    note = "Name of the media source to use in OBS.",
    selectedMediaName,
    className,
    onSelect,
  } = props;
  const sources = useOBSStore((state) => state.data.inputList);
  const sourceOptions = sources.map((source) => ({ name: source.inputName, value: source }));

  const selected = React.useMemo(
    () => sourceOptions.find((entry) => entry.name === selectedMediaName),
    [selectedMediaName, sourceOptions],
  );

  return (
    <FormControl label={label} note={note}>
      <SelectInput
        className={className}
        items={sourceOptions}
        renderItem={(entry) => entry?.name ?? "(unnamed)"}
        selectedItem={selected}
        renderPlaceholder={() => "Select an OBS Media Source"}
        onSelect={(entry) => onSelect(entry?.value)}
      />
    </FormControl>
  );
}
