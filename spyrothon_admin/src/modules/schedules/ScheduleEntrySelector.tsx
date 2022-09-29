import * as React from "react";
import { SelectInput } from "@spyrothon/uikit";

import { ScheduleEntryWithDependants } from "./ScheduleTypes";

type ScheduleEntrySelectorProps = {
  label?: React.ReactNode;
  note?: React.ReactNode;
  selectedEntryId?: string;
  entries: ScheduleEntryWithDependants[];
  className?: string;
  onChange: (entry?: ScheduleEntryWithDependants) => unknown;
};

export default function ScheduleEntrySelector(props: ScheduleEntrySelectorProps) {
  const { label, note, selectedEntryId, entries, className, onChange } = props;
  const selectedEntry = React.useMemo(
    () => entries.find((entry) => entry.id === selectedEntryId),
    [selectedEntryId, entries],
  );

  function getOptionName(entry?: ScheduleEntryWithDependants) {
    if (entry == null) return "";
    const { run, interview } = entry;

    if (run != null) return `${run.gameName} - ${run.categoryName}`;
    if (interview != null) return `INTERVIEW: ${interview.topic}`;

    return entry.id;
  }

  return (
    <SelectInput
      label={label}
      note={note}
      className={className}
      items={entries}
      itemToString={(entry) => getOptionName(entry)}
      value={selectedEntry}
      onChange={onChange}
    />
  );
}
