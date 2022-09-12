import * as React from "react";
import {SelectInput} from "@spyrothon/uikit";

import { useOBSStore } from "./OBSStore";
import type { OBSInput } from "./OBSTypes";

type OBSMediaSelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedMediaName?: string;
  marginless?: boolean;
  className?: string;
  onChange: (entry?: OBSInput) => unknown;
};

export default function OBSMediaSelector(props: OBSMediaSelectorProps) {
  const {
    label = "OBS Media Source",
    note = "Name of the media source to use in OBS.",
    selectedMediaName,
    marginless,
    className,
    onChange,
  } = props;
  const sources = useOBSStore((state) => state.data.inputList);

  const selected = React.useMemo(
    () => sources.find((entry) => entry.inputName === selectedMediaName),
    [selectedMediaName, sources],
  );

  return (
    <SelectInput
      label={label}
      note={note}
      className={className}
      items={sources}
      itemToString={(entry) => entry?.inputName ?? "(unnamed)"}
      value={selected}
      marginless={marginless}
      allowEmpty
      emptyLabel="Select an OBS Media Source"
      onChange={onChange}
    />
  );
}
