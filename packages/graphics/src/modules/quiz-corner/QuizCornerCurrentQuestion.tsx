import * as React from "react";
import classNames from "classnames";
import { Interview } from "@spyrothon/api";

import styles from "./QuizCornerCurrentQuestion.module.css";

type QuizCornerCurrentQuestionProps = {
  interview?: Interview;
  className?: string;
};

export default function QuizCornerCurrentQuestion(props: QuizCornerCurrentQuestionProps) {
  const { interview, className } = props;
  if (interview == null) return null;

  const { questions, currentQuestion } = interview;
  const question = questions.find((q) => q.question === currentQuestion);

  return (
    <div className={classNames(styles.container, className)}>
      {question?.showQuestion ? <div className={styles.question}>{question?.question}</div> : null}
      {question?.showAnswer && question?.image != null ? (
        <div
          className={styles.answerImage}
          style={{
            backgroundImage: `url(${question.image})`,
          }}
        />
      ) : null}
      {question?.showAnswer ? <div className={styles.answer}>{question?.answer}</div> : null}
    </div>
  );
}
