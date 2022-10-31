import * as React from "react";
import { Twitch, Twitter } from "react-feather";
import { Commentator, Run, Runner, ScheduleEntry } from "@spyrothon/api";
import {
  Button,
  Card,
  Clickable,
  DurationInput,
  FormControl,
  Header,
  openPopout,
  Spacer,
  Stack,
  Text,
  TextArea,
  TextInput,
} from "@spyrothon/sparx";
import { formatDuration, SaveState, useSaveable } from "@spyrothon/utils";

import useSafeDispatch from "@admin/hooks/useDispatch";

import { useSafeSelector } from "../../Store";
import { useParticipant } from "../participants/ParticipantStore";
import SelectParticipantPopout from "../participants/SelectParticipantPopout";
import CommentatorPopout from "./CommentatorPopout";
import { addRunner, persistRun } from "./RunActions";
import RunnerPopout from "./RunnerPopout";
import * as RunStore from "./RunStore";
import useRunEditorState from "./useRunEditorState";

import styles from "./RunEditor.module.css";

type RunEditorProps = {
  scheduleEntry: ScheduleEntry;
  className?: string;
};

function openRunnerPopout(runId: string, runnerId: string, target: HTMLElement) {
  openPopout((props) => <RunnerPopout {...props} runId={runId} runnerId={runnerId} />, target);
}

function openCommentatorPopout(runId: string, commentatorId: string, target: HTMLElement) {
  openPopout(
    (props) => <CommentatorPopout {...props} runId={runId} commentatorId={commentatorId} />,
    target,
  );
}
function RunnerInfo(props: { runId: string; runner: Runner }) {
  const { runId, runner } = props;

  const participant = useParticipant(runner.participantId);

  return (
    <Clickable
      key={runner.id}
      onClick={(event) => openRunnerPopout(runId, runner.id, event.currentTarget)}>
      <Card>
        <Stack spacing="space-xs">
          <Text variant="header-sm/normal">
            {runner.displayName ?? participant.displayName}{" "}
            {participant.pronouns != null ? <small>({participant.pronouns})</small> : null}
          </Text>
          <Stack direction="horizontal" align="center">
            {participant.twitchName != null ? (
              <Text>
                <Twitch size={16} /> {participant.twitchName}
              </Text>
            ) : null}
            {participant.twitterName != null ? (
              <Text>
                <Twitter size={16} /> {participant.twitterName}
              </Text>
            ) : null}
          </Stack>
        </Stack>
      </Card>
    </Clickable>
  );
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

  function renderCommentator(commentator: Commentator) {
    const participant = commentator.participant;

    return (
      <Clickable
        key={commentator.id}
        onClick={(event) => openCommentatorPopout(run.id, commentator.id, event.currentTarget)}>
        <Card>
          <Stack spacing="space-xs">
            <Text variant="header-sm/normal">
              {commentator.displayName ?? participant.displayName}{" "}
              {participant.pronouns != null ? <small>({participant.pronouns})</small> : null}
            </Text>
            <Stack direction="horizontal" align="center">
              {participant.twitchName != null ? (
                <Text>
                  <Twitch size={16} /> {participant.twitchName}
                </Text>
              ) : null}
              {participant.twitterName != null ? (
                <Text>
                  <Twitter size={16} /> {participant.twitterName}
                </Text>
              ) : null}
            </Stack>
          </Stack>
        </Card>
      </Clickable>
    );
  }

  function handleAddRunner(target: HTMLElement) {
    const existingParticipantIds = run.runners.map((runner) => runner.participant.id);

    function handleSelect(participantId: string) {
      return dispatch(addRunner(run.id, { participantId }));
    }

    openPopout(
      (props) => (
        <SelectParticipantPopout
          {...props}
          existingParticipantIds={existingParticipantIds}
          onSelect={handleSelect}
        />
      ),
      target,
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
                value={editor.getField("gameName") ?? ""}
                onChange={(event) => editor.updateField("gameName", event.target.value)}
              />
            </FormControl>
            <FormControl label="Category Name" note={getNote("categoryName")}>
              <TextInput
                value={editor.getField("categoryName") ?? ""}
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
                  value={editor.getField("platform") ?? ""}
                  onChange={(event) => editor.updateField("platform", event.target.value)}
                />
              </FormControl>
              <FormControl label="Release Year" note={getNote("releaseYear")}>
                <TextInput
                  value={editor.getField("releaseYear") ?? ""}
                  pattern="\d\d\d\d"
                  onChange={(event) => editor.updateField("releaseYear", event.target.value)}
                />
              </FormControl>
            </Stack>
            <FormControl label="Notes" note={getNote("notes")}>
              <TextArea
                value={editor.getField("notes") ?? ""}
                onChange={(event) => editor.updateField("notes", event.target.value)}
              />
            </FormControl>
            <Header tag="h2">Layout Information</Header>
            <FormControl
              label="Formatted Game Name"
              note="Use newlines to adjust how the game name looks on stream.">
              <TextArea
                value={editor.getField("gameNameFormatted") ?? ""}
                rows={2}
                onChange={(event) => editor.updateField("gameNameFormatted", event.target.value)}
              />
            </FormControl>
          </Stack>
        </Card>

        <Stack spacing="space-md" className={styles.participants}>
          <Header tag="h3">Runners</Header>
          {run.runners.map((runner) => (
            <RunnerInfo key={runner.id} runId={run.id} runner={runner} />
          ))}
          <Button
            variant="primary/outline"
            onClick={(event) => handleAddRunner(event.currentTarget)}>
            Add a Runner
          </Button>
          <Spacer size="space-lg" />
          <Header tag="h3">Commentators</Header>
          {run.commentators.map(renderCommentator)}
        </Stack>
      </Stack>
    </div>
  );
}
