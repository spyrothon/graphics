import * as React from "react";
import { ScheduleEntry } from "@spyrothon/api";
import { ConfirmModal } from "@spyrothon/sparx";

import * as InterviewStore from "@admin/modules/interviews/InterviewStore";
import * as RunStore from "@admin/modules/runs/RunStore";
import { useSafeSelector } from "@admin/Store";

interface ScheduleEntryRemoveModalProps {
  scheduleEntry: ScheduleEntry;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ScheduleEntryRemoveModal(props: ScheduleEntryRemoveModalProps) {
  const { scheduleEntry, onClose, onConfirm } = props;
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId: scheduleEntry.runId }));
  const interview = useSafeSelector((state) =>
    InterviewStore.getInterview(state, { interviewId: scheduleEntry.interviewId }),
  );

  const entryName = run?.gameName ?? interview?.topic ?? scheduleEntry.position + 1;

  return (
    <ConfirmModal
      {...props}
      title="Remove schedule entry"
      body={`Are you sure you want to remove "${entryName}" from this schedule?`}
      onClose={onClose}
      onConfirm={onConfirm}
      onCancel={() => null}
    />
  );
}
