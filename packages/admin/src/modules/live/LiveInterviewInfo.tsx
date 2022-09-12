import * as React from "react";
import classNames from "classnames";

import type { InterviewQuestion, Interview } from "@spyrothon/api";
import {Button, Header, NumberInput, SelectInput, Text} from '@spyrothon/uikit';

import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "../../Store";
import * as InterviewStore from "../../modules/interviews/InterviewStore";
import { persistInterview } from "../interviews/InterviewActions";

import styles from "./LiveInterviewInfo.module.css";

type LiveRunInfoProps = {
  interviewId: string;
  className?: string;
};

export default function LiveInterviewInfo(props: LiveRunInfoProps) {
  const { interviewId, className } = props;
  const dispatch = useSafeDispatch();
  const interview = useSafeSelector((state): Interview | undefined =>
    InterviewStore.getInterview(state, { interviewId }),
  );

  const [selectedQuestion, setSelectedQuestion] = React.useState<InterviewQuestion | undefined>();
  const [scores, setScores] = React.useState(() => {
    const scores: { [name: string]: number | undefined } = {};
    for (const interviewee of interview?.interviewees ?? []) {
      scores[interviewee.displayName] = interviewee.score;
    }
    return scores;
  });

  React.useEffect(() => {
    setSelectedQuestion(
      interview?.questions.find((question) => question.question === currentQuestion),
    );
  }, [interview]);

  if (interview == null) return null;
  const { questions, currentQuestion, interviewees } = interview;

  function setQuestion(newQuestion?: InterviewQuestion) {
    if (newQuestion == null) {
      setSelectedQuestion(undefined);
      dispatch(persistInterview(interviewId, { currentQuestion: undefined }));
    } else {
      const updatedQuestion = {
        ...newQuestion,
        showQuestion: false,
        showHint: false,
        showAnswer: false,
      };
      setSelectedQuestion(updatedQuestion);
      const updatedQuestions = questions.map((question) => {
        return question === newQuestion ? updatedQuestion : question;
      });

      dispatch(
        persistInterview(interviewId, {
          currentQuestion: newQuestion?.question,
          questions: updatedQuestions,
        }),
      );
    }
  }

  function setScore(displayName: string, score?: number) {
    setScores((state) => ({ ...state, [displayName]: score }));
  }

  function handleSaveScores() {
    dispatch(
      persistInterview(interviewId, {
        interviewees: interviewees.map((interviewee) => ({
          ...interviewee,
          score: scores[interviewee.displayName],
        })),
      }),
    );
  }

  function toggle(field: "showQuestion" | "showHint" | "showAnswer") {
    if (selectedQuestion == null) return;

    dispatch(
      persistInterview(interviewId, {
        questions: questions.map((question) =>
          question.question === selectedQuestion.question
            ? { ...question, [field]: !selectedQuestion[field] }
            : question,
        ),
      }),
    );
  }

  return (
    <div className={classNames(className)}>
      <Header size={Header.Sizes.H4}>Questions</Header>
      <SelectInput
        value={selectedQuestion}
        items={questions}
        itemToString={(q) => q?.question ?? ""}
        onChange={(question) => setQuestion(question)}
      />
      <div className={styles.splits}>
        <div className={styles.split}>
          {selectedQuestion != null ? (
            <>
              <Text size={Text.Sizes.SIZE_20}>
                <strong>Answer:</strong> {selectedQuestion?.answer}
              </Text>
              <Text size={Text.Sizes.SIZE_20}>
                <strong>Points:</strong> {selectedQuestion?.score}
              </Text>
              <Button
                onClick={() => toggle("showQuestion")}
                color={
                  selectedQuestion?.showQuestion ? Button.Colors.PRIMARY : Button.Colors.DEFAULT
                }>
                {selectedQuestion?.showQuestion ? "Hide Question" : "Show Question"}
              </Button>
              <Button
                onClick={() => toggle("showHint")}
                color={selectedQuestion?.showHint ? Button.Colors.PRIMARY : Button.Colors.DEFAULT}>
                {selectedQuestion?.showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button
                onClick={() => toggle("showAnswer")}
                color={
                  selectedQuestion?.showAnswer ? Button.Colors.PRIMARY : Button.Colors.DEFAULT
                }>
                {selectedQuestion?.showAnswer ? "Hide Answer" : "Show Answer"}
              </Button>
            </>
          ) : null}
        </div>

        <div className={styles.split}>
          <Header>Scores</Header>
          {interviewees.map((participant) => (
            <NumberInput
              key={participant.displayName}
              label={participant.displayName}
              value={scores[participant.displayName] ?? 0}
              onChange={(score) =>
                setScore(
                  participant.displayName,
                  score.target.value === "" ? undefined : parseInt(score.target.value),
                )
              }
            />
          ))}
          <Button onClick={handleSaveScores}>Save Scores</Button>
        </div>
      </div>
    </div>
  );
}
