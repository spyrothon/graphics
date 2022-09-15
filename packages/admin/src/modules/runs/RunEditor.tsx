import * as React from "react";
import classNames from "classnames";
import {
  Anchor,
  Button,
  DurationInput,
  Header,
  NumberInput,
  TextInput,
  formatDuration,
  useSaveable,
  SaveState,
} from "@spyrothon/uikit";

import { Run, ScheduleEntry } from "@spyrothon/api";
import { useSafeSelector } from "../../Store";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { persistRun } from "./RunActions";
import * as RunStore from "./RunStore";
import useRunEditorState, { RunEditorStateValue } from "./useRunEditorState";

import styles from "./RunEditor.module.css";

type RunEditorProps = {
  scheduleEntry: ScheduleEntry;
  className?: string;
};

function onTransformChange(
  editor: RunEditorStateValue,
  type: "runners" | "commentators",
  index: number,
  transform: "gameplayCropTransform" | "webcamCropTransform",
  position: "top" | "right" | "bottom" | "left",
) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    editor.updateParticipantField(type, index, transform, {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...editor.getParticipantField(type, index, transform),
      [position]: parseInt(event.target.value),
    });
  };
}

export default function RunEditor(props: RunEditorProps) {
  const { scheduleEntry, className } = props;
  const { runId } = scheduleEntry;

  const dispatch = useSafeDispatch();
  const run = useSafeSelector((state) => RunStore.getRun(state, { runId }));
  const editor = useRunEditorState();

  React.useEffect(() => {
    editor.setBaseRun(run);
  }, [run]);

  const [handleSaveRun, getSaveText, saveState] = useSaveable(async () =>
    dispatch(persistRun(run.id, editor.getEditedRun())),
  );

  function getNote<F extends keyof Run>(field: F, additional?: string) {
    const originalValue: any = run?.[field];
    const newValue = editor.getField(field);
    if (run == null || originalValue == null || originalValue === newValue) return additional;

    const renderValue = () => {
      switch (field) {
        case "estimateSeconds":
          return formatDuration(run.estimateSeconds);
        case "notes":
          return "original";
        default:
          return <>&ldquo;{originalValue}&rdquo;</>;
      }
    };

    return (
      <>
        {additional}{" "}
        <Anchor onClick={() => originalValue != null && editor.updateField(field, originalValue)}>
          Reset to {renderValue()}.
        </Anchor>
      </>
    );
  }

  function renderParticipantFields(type: "runners" | "commentators", index: number) {
    return (
      <div className={styles.runner}>
        <div className={styles.inputRow}>
          <TextInput
            marginless
            className={styles.participantInput}
            label="Display Name"
            value={editor.getParticipantField(type, index, "displayName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "displayName", event.target.value)
            }
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label="Pronouns"
            value={editor.getParticipantField(type, index, "pronouns")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "pronouns", event.target.value)
            }
          />
          <TextInput
            marginless
            className={styles.participantInput}
            label="Twitch"
            value={editor.getParticipantField(type, index, "twitchName")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "twitchName", event.target.value)
            }
          />
        </div>
        <div className={styles.inputRow}>
          <TextInput
            marginless
            className={classNames(styles.participantInput, styles.urlInput)}
            label="Gameplay Ingest URL"
            value={editor.getParticipantField(type, index, "gameplayIngestUrl")}
            onChange={(event) =>
              editor.updateParticipantField(type, index, "gameplayIngestUrl", event.target.value)
            }
          />
          <NumberInput
            marginless
            className={classNames(styles.participantInput, styles.numberInput)}
            label="Top"
            value={editor.getParticipantField(type, index, "gameplayCropTransform")?.top}
            onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "top")}
          />
          <NumberInput
            marginless
            className={classNames(styles.participantInput, styles.numberInput)}
            label="Right"
            value={editor.getParticipantField(type, index, "gameplayCropTransform")?.right}
            onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "right")}
          />
          <NumberInput
            marginless
            className={classNames(styles.participantInput, styles.numberInput)}
            label="Bottom"
            value={editor.getParticipantField(type, index, "gameplayCropTransform")?.bottom}
            onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "bottom")}
          />
          <NumberInput
            marginless
            className={classNames(styles.participantInput, styles.numberInput)}
            label="Left"
            value={editor.getParticipantField(type, index, "gameplayCropTransform")?.left}
            onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "left")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.editor}>
        <div className={styles.runInfo}>
          <Header className={styles.header}>
            Run Information
            <Button
              className={styles.saveButton}
              onClick={handleSaveRun}
              disabled={saveState === SaveState.SAVING || !editor.hasChanges()}>
              {getSaveText()}
            </Button>
          </Header>
          <TextInput
            label="Game Name"
            value={editor.getField("gameName")}
            note={getNote("gameName", "This must exactly match the game's name on Twitch.")}
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
            type="textarea"
            label="Notes"
            value={editor.getField("notes")}
            note={getNote("notes")}
            onChange={(event) => editor.updateField("notes", event.target.value)}
          />
          <Header className={styles.header}>Layout Information</Header>
          <TextInput
            type="textarea"
            label="Formatted Game Name"
            note="Use newlines to adjust how the game name looks on stream."
            value={editor.getField("gameNameFormatted")}
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
          {renderParticipantFields("runners", 6)}
          {renderParticipantFields("runners", 7)}
          {renderParticipantFields("runners", 8)}
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
