import * as React from "react";
import { animated, config, useTransition } from "react-spring";

import { ART_ENTRIES } from "./ArtConstants";

import styles from "./ArtRotation.module.css";

type ArtRotationProps = {
  className?: string;
};

export default function ArtRotation(props: ArtRotationProps) {
  const { className } = props;

  const [currentIndex, setCurrentIndex] = React.useState(() =>
    Math.floor(Math.random() * ART_ENTRIES.length),
  );
  React.useEffect(() => {
    setInterval(() => setCurrentIndex((currentIndex) => currentIndex + 1), 13027);
  }, []);
  const currentSection = ART_ENTRIES[currentIndex % ART_ENTRIES.length];

  const transitions = useTransition(currentSection, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
    reset: true,
    trail: -200,
  });

  return (
    <div className={className}>
      <div className={styles.container}>
        {transitions((style, item) => (
          <animated.div style={style} className={styles.entry}>
            <div className={styles.image} style={{ backgroundImage: `url(${item.source})` }} />
            <div className={styles.character}>{item.character}</div>
            <div className={styles.credit}>
              by <span className={styles.artistName}>{item.artistName}</span> &ndash;{" "}
              <span className={styles.artistTwitter}>@{item.artistTwitter}</span>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}
