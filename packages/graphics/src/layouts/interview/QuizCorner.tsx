import * as React from "react";

import { useSafeSelector } from "@graphics/Store";
import InterviewStore from "@graphics/modules/interviews/InterviewStore";
import Omnibar from "@graphics/modules/omnibar/Omnibar";
import ScheduleStore from "@graphics/modules/schedules/ScheduleStore";
import QuizCornerCurrentQuestion from "@graphics/modules/quiz-corner/QuizCornerCurrentQuestion";
import QuizCornerScores from "@graphics/modules/quiz-corner/QuizCornerScores";
import Layout from "@graphics/uikit/Layout";

import styles from "./QuizCorner.module.css";

export default function QuizCorner() {
  const currentInterview = useSafeSelector((state) => {
    const entry = ScheduleStore.getCurrentEntry(state);
    if (entry == null) return undefined;
    return InterviewStore.getInterview(state, { interviewId: entry.interviewId });
  });

  return (
    <Layout>
      <div className={styles.quizContainer}>
        <QuizCornerCurrentQuestion
          className={styles.currentQuestion}
          interview={currentInterview}
        />
        <QuizCornerScores className={styles.scores} interview={currentInterview} />
      </div>
      <Omnibar className={styles.omnibar} />
    </Layout>
  );
}
