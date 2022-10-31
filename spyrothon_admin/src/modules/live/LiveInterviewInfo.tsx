import * as React from "react";
import type { Interview, InterviewQuestion } from "@spyrothon/api";
import {
  Button,
  Card,
  FormControl,
  Header,
  SelectInput,
  Stack,
  Text,
  TextInput,
} from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";

import * as InterviewStore from "../../modules/interviews/InterviewStore";
import { useSafeSelector } from "../../Store";
import { persistInterview } from "../interviews/InterviewActions";
import getDisplayNameForParticipant from "../participants/getDisplayNameForParticipant";

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
      scores[interviewee.id] = interviewee.score;
    }
    return scores;
  });

  React.useEffect(() => {
    setSelectedQuestion(
      interview?.questions.find((question) => question.question === interview?.currentQuestion),
    );
  }, [interview]);

  if (interview == null) return null;
  const { questions, interviewees } = interview;
  const questionOptions = questions.map((question) => ({
    name: question.question,
    value: question,
  }));
  const selectedQuestionOption = questionOptions.find(
    (option) => option.value === selectedQuestion,
  );

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

  function setScore(participantId: string, score?: number) {
    setScores((state) => ({ ...state, [participantId]: score }));
  }

  function handleSaveScores() {
    dispatch(
      persistInterview(interviewId, {
        interviewees: interviewees.map((interviewee) => ({
          ...interviewee,
          score: scores[interviewee.id],
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
    <Card className={className}>
      <Stack spacing="space-lg">
        <Header tag="h4" variant="header-md/normal">
          Questions
        </Header>
        <SelectInput
          selectedItem={selectedQuestionOption}
          items={questionOptions}
          renderItem={(question) => question?.name ?? ""}
          onSelect={(question) => setQuestion(question?.value)}
        />
        <Stack direction="horizontal" spacing="space-lg">
          <Stack>
            {selectedQuestion != null ? (
              <>
                <Text variant="text-lg/normal">
                  <strong>Answer:</strong> {selectedQuestion?.answer}
                </Text>
                <Text variant="text-lg/normal">
                  <strong>Points:</strong> {selectedQuestion?.score}
                </Text>
                <Button
                  onClick={() => toggle("showQuestion")}
                  color={selectedQuestion?.showQuestion ? "primary" : "default"}>
                  {selectedQuestion?.showQuestion ? "Hide Question" : "Show Question"}
                </Button>
                <Button
                  onClick={() => toggle("showHint")}
                  color={selectedQuestion?.showHint ? "primary" : "default"}>
                  {selectedQuestion?.showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button
                  onClick={() => toggle("showAnswer")}
                  color={selectedQuestion?.showAnswer ? "primary" : "default"}>
                  {selectedQuestion?.showAnswer ? "Hide Answer" : "Show Answer"}
                </Button>
              </>
            ) : null}
          </Stack>

          <Stack>
            <Header tag="h4">Scores</Header>
            {interviewees.map((interviewee) => (
              <FormControl key={interviewee.id} label={getDisplayNameForParticipant(interviewee)}>
                <TextInput
                  type="number"
                  value={scores[interviewee.id] ?? 0}
                  onChange={(score) =>
                    setScore(
                      interviewee.id,
                      score.target.value === "" ? undefined : parseInt(score.target.value),
                    )
                  }
                />
              </FormControl>
            ))}
            <Button variant="primary" onClick={handleSaveScores}>
              Save Scores
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
