import * as React from "react";
import classNames from "classnames";
import { Run, ScheduleEntry } from "@spyrothon/api";
import {
  Button,
  Card,
  DurationInput,
  FormControl,
  Header,
  Stack,
  TextArea,
  TextInput,
} from "@spyrothon/sparx";
import { formatDuration, SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
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
    // `editor` is a new object every time, but the state persists
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Button
          variant="primary"
          onClick={() => originalValue != null && editor.updateField(field, originalValue)}>
          Reset to {renderValue()}.
        </Button>
      </>
    );
  }

  function renderParticipantFields(type: "runners" | "commentators", index: number) {
    return (
      <Card>
        <Stack spacing="space-lg">
          <Stack direction="horizontal" justify="stretch">
            <FormControl label="Display Name">
              <TextInput
                className={styles.participantInput}
                value={editor.getParticipantField(type, index, "displayName")}
                onChange={(event) =>
                  editor.updateParticipantField(type, index, "displayName", event.target.value)
                }
              />
            </FormControl>
            <FormControl label="Pronouns">
              <TextInput
                className={styles.participantInput}
                value={editor.getParticipantField(type, index, "pronouns")}
                onChange={(event) =>
                  editor.updateParticipantField(type, index, "pronouns", event.target.value)
                }
              />
            </FormControl>
            <FormControl label="Twitch">
              <TextInput
                className={styles.participantInput}
                value={editor.getParticipantField(type, index, "twitchName")}
                onChange={(event) =>
                  editor.updateParticipantField(type, index, "twitchName", event.target.value)
                }
              />
            </FormControl>
            <FormControl label="Gameplay Ingest URL">
              <TextInput
                className={classNames(styles.participantInput, styles.urlInput)}
                value={editor.getParticipantField(type, index, "gameplayIngestUrl")}
                onChange={(event) =>
                  editor.updateParticipantField(
                    type,
                    index,
                    "gameplayIngestUrl",
                    event.target.value,
                  )
                }
              />
            </FormControl>
          </Stack>
          <Stack direction="horizontal" justify="stretch" wrap={false}>
            <FormControl label="Top">
              <TextInput
                type="number"
                value={editor.getParticipantField(type, index, "gameplayCropTransform")?.top}
                onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "top")}
              />
            </FormControl>
            <FormControl label="Right">
              <TextInput
                type="number"
                value={editor.getParticipantField(type, index, "gameplayCropTransform")?.right}
                onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "right")}
              />
            </FormControl>
            <FormControl label="Bottom">
              <TextInput
                type="number"
                value={editor.getParticipantField(type, index, "gameplayCropTransform")?.bottom}
                onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "bottom")}
              />
            </FormControl>
            <FormControl label="Left">
              <TextInput
                type="number"
                value={editor.getParticipantField(type, index, "gameplayCropTransform")?.left}
                onChange={onTransformChange(editor, type, index, "gameplayCropTransform", "left")}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Stack spacing="space-lg" direction="horizontal" align="start">
        <Card className={styles.runInfo}>
          <Stack spacing="space-lg">
            <Stack direction="horizontal" justify="space-between">
              <Header tag="h2">Run Information</Header>
              <Button
                variant="primary"
                onClick={handleSaveRun}
                disabled={saveState === SaveState.SAVING || !editor.hasChanges()}>
                {getSaveText()}
              </Button>
            </Stack>
            <FormControl
              label="Game Name"
              note={getNote("gameName", "This must exactly match the game's name on Twitch.")}>
              <TextInput
                value={editor.getField("gameName")}
                onChange={(event) => editor.updateField("gameName", event.target.value)}
              />
            </FormControl>
            <FormControl label="Category Name" note={getNote("categoryName")}>
              <TextInput
                value={editor.getField("categoryName")}
                onChange={(event) => editor.updateField("categoryName", event.target.value)}
              />
            </FormControl>
            <Stack direction="horizontal" justify="stretch">
              <FormControl label="Estimate" note={getNote("estimateSeconds")}>
                <DurationInput
                  value={editor.getField("estimateSeconds")}
                  onChange={(value) => editor.updateField("estimateSeconds", value)}
                />
              </FormControl>
              <FormControl label="Platform" note={getNote("platform")}>
                <TextInput
                  value={editor.getField("platform")}
                  onChange={(event) => editor.updateField("platform", event.target.value)}
                />
              </FormControl>
              <FormControl label="Release Year" note={getNote("releaseYear")}>
                <TextInput
                  value={editor.getField("releaseYear")}
                  pattern="\d\d\d\d"
                  onChange={(event) => editor.updateField("releaseYear", event.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl label="Notes" note={getNote("notes")}>
              <TextArea
                value={editor.getField("notes")}
                onChange={(event) => editor.updateField("notes", event.target.value)}
              />
            </FormControl>
            <Header tag="h2">Layout Information</Header>
            <FormControl
              label="Formatted Game Name"
              note="Use newlines to adjust how the game name looks on stream.">
              <TextArea
                value={editor.getField("gameNameFormatted")}
                rows={2}
                onChange={(event) => editor.updateField("gameNameFormatted", event.target.value)}
              />
            </FormControl>
          </Stack>
        </Card>

        <Stack spacing="space-lg" className={styles.participants}>
          <Header tag="h3">Runners</Header>
          {renderParticipantFields("runners", 0)}
          {renderParticipantFields("runners", 1)}
          {renderParticipantFields("runners", 2)}
          {renderParticipantFields("runners", 3)}
          {renderParticipantFields("runners", 4)}
          {renderParticipantFields("runners", 5)}
          {renderParticipantFields("runners", 6)}
          {renderParticipantFields("runners", 7)}
          {renderParticipantFields("runners", 8)}
          <Header tag="h3">Commentators</Header>
          {renderParticipantFields("commentators", 0)}
          {renderParticipantFields("commentators", 1)}
          {renderParticipantFields("commentators", 2)}
          {renderParticipantFields("commentators", 3)}
        </Stack>
      </Stack>
    </div>
  );
}
