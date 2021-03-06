import * as React from "react";
import classNames from "classnames";

import { Run, ScheduleEntry } from "../../../api/APITypes";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "../../hooks/useDispatch";
import Anchor from "../../uikit/Anchor";
import Button from "../../uikit/Button";
import DurationInput from "../../uikit/DurationInput";
import Header from "../../uikit/Header";
import Text from "../../uikit/Text";
import TextInput from "../../uikit/TextInput";
import { updateScheduleEntry } from "../schedules/ScheduleActions";
import * as DurationUtils from "../time/DurationUtils";
import { persistRun } from "./RunActions";
import * as RunStore from "./RunStore";
import useRunEditorState from "./useRunEditorState";

import styles from "./RunEditor.mod.css";

type RunEditorProps = {
  scheduleEntry: ScheduleEntry;
  className?: string;
};

export default function RunEditor(props: RunEditorProps) {
  const { scheduleEntry, className } = props;
  const { runId } = scheduleEntry;

  const dispatch = useSafeDispatch();
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const editor = useRunEditorState();
  const [editedEntry, setEditedEntry] = React.useState(scheduleEntry);
  const hasEntryChanges = scheduleEntry.setupSeconds !== editedEntry.setupSeconds;

  React.useEffect(() => {
    setEditedEntry(scheduleEntry);
  }, [scheduleEntry]);

  React.useEffect(() => {
    editor.setBaseRun(run);
  }, [run]);

  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [saveFailed, setSaveFailed] = React.useState(false);

  function handleSaveRun() {
    const run = editor.getEditedRun();
    if (run == null) return false;

    setSaving(true);
    setSaveFailed(false);
    Promise.all([
      editor.hasChanges() ? dispatch(persistRun(run.id, run)) : undefined,
      hasEntryChanges ? dispatch(updateScheduleEntry(editedEntry)) : undefined,
    ])
      .then(() => {
        setSaving(false);
        setSaveFailed(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      })
      .catch(() => {
        setSaving(false);
        setSaved(true);
        setSaveFailed(true);
      });
  }

  function getSaveText() {
    if (!saved) return null;

    if (saveFailed) {
      return (
        <Text className={styles.saveFailed} marginless>
          <strong>Failed to save the run!</strong>
        </Text>
      );
    }

    return (
      <Text className={styles.saveSucceeded} marginless>
        <strong>Saved!</strong>
      </Text>
    );
  }

  function getNote<F extends keyof Run>(field: F) {
    let originalValue: any = run?.[field];
    const newValue = editor.getField(field);
    if (run == null || originalValue == null || originalValue == newValue) return null;

    const renderValue = () => {
      switch (field) {
        case "estimateSeconds":
          return DurationUtils.toString(run["estimateSeconds"]);
        case "notes":
          return "original";
        default:
          return <>&ldquo;{originalValue}&rdquo;</>;
      }
    };

    return (
      <Anchor onClick={() => originalValue != null && editor.updateField(field, originalValue)}>
        Reset to {renderValue()}.
      </Anchor>
    );
  }

  function renderParticipantFields(type: "runners" | "commentators", index: number) {
    return (
      <div className={styles.runner}>
        <div className={styles.inputRow}>
          <TextInput
            marginless
            className={styles.participantInput}
            label={index === 0 ? "Display Name" : undefined}
            value={editor.getParticipantField(type, index, "displayName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "displayName", event.target.value)
            }
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label={index === 0 ? "Twitch" : undefined}
            value={editor.getParticipantField(type, index, "twitchName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "twitchName", event.target.value)
            }
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label={index === 0 ? "Twitter" : undefined}
            value={editor.getParticipantField(type, index, "twitterName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "twitterName", event.target.value)
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.actions}>
        <div className={styles.saveAction}>
          <Button
            onClick={handleSaveRun}
            disabled={saving || (!editor.hasChanges() && !hasEntryChanges)}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {getSaveText()}
        </div>
        <div className={styles.entryFields}>
          <DurationInput
            label="Estimated Setup Time"
            value={editedEntry.setupSeconds}
            marginless
            onChange={(value) => setEditedEntry({ ...scheduleEntry, setupSeconds: value })}
          />
        </div>
      </div>
      <div className={styles.editor}>
        <div className={styles.runInfo}>
          <Header className={styles.header}>Run Information</Header>
          <TextInput
            label="Game Name"
            value={editor.getField("gameName")}
            note={getNote("gameName")}
            onChange={(event) => editor.updateField("gameName", event.target.value)}
          />
          <TextInput
            label="Category Name"
            value={editor.getField("categoryName")}
            note={getNote("categoryName")}
            onChange={(event) => editor.updateField("categoryName", event.target.value)}
          />
          <div className={styles.inputRow}>
            <DurationInput
              label="Estimate"
              value={editor.getField("estimateSeconds")}
              note={getNote("estimateSeconds")}
              onChange={(value) => editor.updateField("estimateSeconds", value)}
            />
            <TextInput
              label="Platform"
              value={editor.getField("platform")}
              note={getNote("platform")}
              onChange={(event) => editor.updateField("platform", event.target.value)}
            />
            <TextInput
              label="Release Year"
              value={editor.getField("releaseYear")}
              note={getNote("releaseYear")}
              pattern="\d\d\d\d"
              onChange={(event) => editor.updateField("releaseYear", event.target.value)}
            />
          </div>
          <TextInput
            label="Notes"
            value={editor.getField("notes")}
            note={getNote("notes")}
            multiline
            onChange={(event) => editor.updateField("notes", event.target.value)}
          />
          <Header className={styles.header}>Layout Information</Header>
          <TextInput
            label="Formatted Game Name"
            note="Use newlines to adjust how the game name looks on stream."
            value={editor.getField("gameNameFormatted")}
            multiline
            // @ts-expect-error TextInput needs to handle textarea props
            rows={2}
            onChange={(event) => editor.updateField("gameNameFormatted", event.target.value)}
          />
        </div>

        <div className={styles.participants}>
          <Header className={styles.header}>Runners</Header>
          {renderParticipantFields("runners", 0)}
          {renderParticipantFields("runners", 1)}
          {renderParticipantFields("runners", 2)}
          {renderParticipantFields("runners", 3)}
          {renderParticipantFields("runners", 4)}
          {renderParticipantFields("runners", 5)}
          <Header className={styles.header}>Commentators</Header>
          {renderParticipantFields("commentators", 0)}
          {renderParticipantFields("commentators", 1)}
          {renderParticipantFields("commentators", 2)}
          {renderParticipantFields("commentators", 3)}
        </div>
      </div>
    </div>
  );
}
