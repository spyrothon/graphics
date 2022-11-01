import * as React from "react";
import { Twitch, Twitter } from "react-feather";
import { Interview, InterviewParticipant, ScheduleEntry } from "@spyrothon/api";
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
import getDisplayNameForParticipant from "../participants/getDisplayNameForParticipant";
import { useParticipant } from "../participants/ParticipantStore";
import SelectParticipantPopout from "../participants/SelectParticipantPopout";
import { addInterviewee, addInterviewer, persistInterview } from "./InterviewActions";
import InterviewParticipantPopout from "./InterviewParticipantPopout";
import * as InterviewStore from "./InterviewStore";
import useInterviewEditorState from "./useInterviewEditorState";

import styles from "./InterviewEditor.module.css";

function openInterviewParticipantPopout(
  interviewId: string,
  interviewParticipantId: string,
  type: "interviewers" | "interviewees",
  target: HTMLElement,
) {
  openPopout(
    (props) => (
      <InterviewParticipantPopout
        {...props}
        type={type}
        interviewId={interviewId}
        interviewParticipantId={interviewParticipantId}
      />
    ),
    target,
  );
}

function InterviewParticipantInfo(props: {
  interviewId: string;
  interviewParticipant: InterviewParticipant;
  type: "interviewers" | "interviewees";
}) {
  const { interviewId, interviewParticipant, type } = props;

  const participant = useParticipant(interviewParticipant.participantId);

  return (
    <Clickable
      key={interviewParticipant.id}
      onClick={(event) =>
        openInterviewParticipantPopout(
          interviewId,
          interviewParticipant.id,
          type,
          event.currentTarget,
        )
      }>
      <Card>
        <Stack spacing="space-xs">
          <Text variant="header-sm/normal">
            {getDisplayNameForParticipant(interviewParticipant)}{" "}
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

  function handleAddInterviewer(target: HTMLElement) {
    const existingParticipantIds = interview.interviewers.map(
      (interviewer) => interviewer.participantId,
    );

    function handleSelect(participantId: string) {
      return dispatch(addInterviewer(interview.id, { participantId }));
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

  function handleAddInterviewee(target: HTMLElement) {
    const existingParticipantIds = interview.interviewees.map(
      (interviewer) => interviewer.participantId,
    );

    function handleSelect(participantId: string) {
      return dispatch(addInterviewee(interview.id, { participantId }));
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

  function renderQuestionFields(index: number) {
    return (
      <Card>
        <FormControl label="Question">
          <TextInput
            className={styles.participantInput}
            value={editor.getQuestionField(index, "question") ?? ""}
            onChange={(event) => editor.updateQuestionField(index, "question", event.target.value)}
          />
        </FormControl>
        <Stack direction="horizontal" justify="stretch">
          <FormControl label="Category">
            <TextInput
              value={editor.getQuestionField(index, "category") ?? ""}
              onChange={(event) =>
                editor.updateQuestionField(index, "category", event.target.value)
              }
            />
          </FormControl>
          <FormControl label="Hint">
            <TextInput
              value={editor.getQuestionField(index, "hint") ?? ""}
              onChange={(event) => editor.updateQuestionField(index, "hint", event.target.value)}
            />
          </FormControl>
          <FormControl label="Image">
            <TextInput
              value={editor.getQuestionField(index, "image") ?? ""}
              onChange={(event) => editor.updateQuestionField(index, "image", event.target.value)}
            />
          </FormControl>
        </Stack>

        <Stack direction="horizontal" justify="stretch">
          <FormControl label="Answer">
            <TextInput
              value={editor.getQuestionField(index, "answer") ?? ""}
              onChange={(event) => editor.updateQuestionField(index, "answer", event.target.value)}
            />
          </FormControl>
          <FormControl label="Score">
            <TextInput
              type="number"
              pattern="\d+"
              value={editor.getQuestionField(index, "score") ?? ""}
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
                value={editor.getField("topic") ?? ""}
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
                value={editor.getField("notes") ?? ""}
                onChange={(event) => editor.updateField("notes", event.target.value)}
              />
            </FormControl>
            <Header tag="h2">Questions</Header>
            {renderQuestionFields(0)}
            {renderQuestionFields(1)}
            {renderQuestionFields(2)}
          </Stack>
        </Card>
        <Stack spacing="space-lg" className={styles.participants}>
          <Header tag="h3">Interviewers</Header>
          {interview.interviewers.map((interviewer) => (
            <InterviewParticipantInfo
              key={interviewer.id}
              interviewId={interview.id}
              type="interviewers"
              interviewParticipant={interviewer}
            />
          ))}
          <Button
            variant="primary/outline"
            onClick={(event) => handleAddInterviewer(event.currentTarget)}>
            Add an Interviewer
          </Button>
          <Spacer size="space-lg" />
          <Header tag="h3">Interviewees</Header>
          {interview.interviewees.map((interviewee) => (
            <InterviewParticipantInfo
              key={interviewee.id}
              interviewId={interview.id}
              type="interviewees"
              interviewParticipant={interviewee}
            />
          ))}
          <Button
            variant="primary/outline"
            onClick={(event) => handleAddInterviewee(event.currentTarget)}>
            Add an Interviewee
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
