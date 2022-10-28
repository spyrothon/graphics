import * as React from "react";
import { Interview, ScheduleEntry } from "@spyrothon/api";
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
import { persistInterview } from "./InterviewActions";
import * as InterviewStore from "./InterviewStore";
import useInterviewEditorState from "./useInterviewEditorState";

import styles from "./InterviewEditor.module.css";

type InterviewEditorProps = {
  scheduleEntry: ScheduleEntry;
  className?: string;
};

export default function InterviewEditor(props: InterviewEditorProps) {
  const { scheduleEntry, className } = props;
  const { interviewId } = scheduleEntry;

  const dispatch = useSafeDispatch();
  const interview = useSafeSelector((state) => InterviewStore.getInterview(state, { interviewId }));
  const editor = useInterviewEditorState();

  React.useEffect(() => {
    editor.setBase(interview);
    // `editor` is a new object every time, but the state persists
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interview]);

  const [handleSave, getSaveText, saveState] = useSaveable(async () => {
    const interview = editor.getEditedInterview();
    if (interview == null) return;

    dispatch(persistInterview(interview.id, interview));
  });

  function getNote<F extends keyof Interview>(field: F) {
    const originalValue: any = interview?.[field];
    const newValue = editor.getField(field);
    if (interview == null || originalValue == null || originalValue == newValue) return null;

    const renderValue = () => {
      switch (field) {
        case "estimateSeconds":
          return formatDuration(interview.estimateSeconds);
        case "notes":
          return "original";
        default:
          return <>&ldquo;{originalValue}&rdquo;</>;
      }
    };

    return (
      <Button
        variant="primary"
        onClick={() => originalValue != null && editor.updateField(field, originalValue)}>
        Reset to {renderValue()}.
      </Button>
    );
  }

  function renderParticipantFields(type: "interviewers" | "interviewees", index: number) {
    return (
      <Card>
        <Stack direction="horizontal" justify="stretch">
          <FormControl label={index === 0 ? "Display Name" : undefined}>
            <TextInput
              value={editor.getParticipantField(type, index, "displayName")}
              onChange={(event) =>
                editor.updateParticipantField(type, index, "displayName", event.target.value)
              }
            />
          </FormControl>
          <FormControl label={index === 0 ? "Pronouns" : undefined}>
            <TextInput
              value={editor.getParticipantField(type, index, "pronouns")}
              onChange={(event) =>
                editor.updateParticipantField(type, index, "pronouns", event.target.value)
              }
            />
          </FormControl>
          <FormControl label={index === 0 ? "Twitch" : undefined}>
            <TextInput
              value={editor.getParticipantField(type, index, "twitchName")}
              onChange={(event) =>
                editor.updateParticipantField(type, index, "twitchName", event.target.value)
              }
            />
          </FormControl>
        </Stack>
      </Card>
    );
  }

  function renderQuestionFields(index: number) {
    return (
      <Card>
        <FormControl label="Question">
          <TextInput
            className={styles.participantInput}
            value={editor.getQuestionField(index, "question")}
            onChange={(event) => editor.updateQuestionField(index, "question", event.target.value)}
          />
        </FormControl>
        <Stack direction="horizontal" justify="stretch">
          <FormControl label="Category">
            <TextInput
              value={editor.getQuestionField(index, "category")}
              onChange={(event) =>
                editor.updateQuestionField(index, "category", event.target.value)
              }
            />
          </FormControl>
          <FormControl label="Hint">
            <TextInput
              value={editor.getQuestionField(index, "hint")}
              onChange={(event) => editor.updateQuestionField(index, "hint", event.target.value)}
            />
          </FormControl>
          <FormControl label="Image">
            <TextInput
              value={editor.getQuestionField(index, "image")}
              onChange={(event) => editor.updateQuestionField(index, "image", event.target.value)}
            />
          </FormControl>
        </Stack>

        <Stack direction="horizontal" justify="stretch">
          <FormControl label="Answer">
            <TextInput
              value={editor.getQuestionField(index, "answer")}
              onChange={(event) => editor.updateQuestionField(index, "answer", event.target.value)}
            />
          </FormControl>
          <FormControl label="Score">
            <TextInput
              type="number"
              pattern="\d+"
              value={editor.getQuestionField(index, "score")}
              onChange={(event) =>
                editor.updateQuestionField(index, "score", parseInt(event.target.value))
              }
            />
          </FormControl>
        </Stack>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Stack spacing="space-lg" direction="horizontal" align="start">
        <Card className={styles.info}>
          <Stack spacing="space-lg">
            <Stack direction="horizontal" justify="space-between">
              <Header tag="h2">Interview Information</Header>
              <Button
                variant="primary"
                className={styles.saveButton}
                onClick={handleSave}
                disabled={saveState === SaveState.SAVING || !editor.hasChanges()}>
                {getSaveText()}
              </Button>
            </Stack>
            <FormControl label="Topic" note={getNote("topic")}>
              <TextInput
                value={editor.getField("topic")}
                onChange={(event) => editor.updateField("topic", event.target.value)}
              />
            </FormControl>
            <FormControl label="Estimated Time" note={getNote("estimateSeconds")}>
              <DurationInput
                value={editor.getField("estimateSeconds")}
                onChange={(value) => editor.updateField("estimateSeconds", value)}
              />
            </FormControl>
            <FormControl label="Notes" note={getNote("notes")}>
              <TextArea
                value={editor.getField("notes")}
                onChange={(event) => editor.updateField("notes", event.target.value)}
              />
            </FormControl>
            <Header tag="h2">Questions</Header>
            {renderQuestionFields(0)}
            {renderQuestionFields(1)}
            {renderQuestionFields(2)}
            {renderQuestionFields(3)}
            {renderQuestionFields(4)}
            {renderQuestionFields(5)}
          </Stack>
        </Card>
        <Stack spacing="space-lg" className={styles.participants}>
          <Header tag="h2">Interviewer</Header>
          {renderParticipantFields("interviewers", 0)}
          <Header tag="h2">Interviewees</Header>
          {renderParticipantFields("interviewees", 0)}
          {renderParticipantFields("interviewees", 1)}
          {renderParticipantFields("interviewees", 2)}
          {renderParticipantFields("interviewees", 3)}
        </Stack>
      </Stack>
    </div>
  );
}
