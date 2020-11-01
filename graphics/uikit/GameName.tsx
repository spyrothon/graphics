import * as React from "react";
import classNames from "classnames";

import FittedText from "./FittedText";

import styles from "./GameName.mod.css";

type GameNameProps = {
  name: string;
  className?: string;
};

export default function GameName(props: GameNameProps) {
  const name = props.name.replace(/\\n/gi, "<br />");
  return (
    <div className={props.className}>
      <svg style={{ visibility: "hidden" }} height="0">
        <defs>
          <filter id="stroke">
            <feFlood floodColor="#805268" result="outside-color" />
            <feMorphology in="SourceAlpha" operator="dilate" radius="4" />
            <feComposite in="outside-color" operator="in" result="outside-stroke" />
            <feOffset in="SourceAlpha" result="shadow-offset" dx="0" dy="4" />
            <feGaussianBlur in="shadow-offset" result="drop-shadow" stdDeviation="12" />
            <feMerge>
              <feMergeNode in="drop-shadow" />
              <feMergeNode in="outside-stroke" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <FittedText className={classNames(styles.text)} maxSize={52}>
        <span dangerouslySetInnerHTML={{ __html: name }} />
      </FittedText>
    </div>
  );
}