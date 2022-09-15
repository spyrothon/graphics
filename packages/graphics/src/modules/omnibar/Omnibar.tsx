import * as React from "react";
import classNames from "classnames";
import { animated, config, useTransition } from "react-spring";

import { useSafeSelector } from "@graphics/Store";
import ScheduleStore from "../schedules/ScheduleStore";
import OmnibarPlainText from "./OmnibarPlainText";
import OmnibarUpNext from "./OmnibarUpNext";

import styles from "./Omnibar.module.css";

type OmnibarProps = {
  className?: string;
};

export default function Omnibar(props: OmnibarProps) {
  const { className } = props;
  const schedule = useSafeSelector(ScheduleStore.getSchedule);

  const sections = [
    { id: "up-next", content: () => <OmnibarUpNext /> },
    {
      id: "schedule",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Check out the full schedule at{" "}
              <span className={styles.textEmphasis}>spyrothon.org</span>.
            </>
          }
        />
      ),
    },
    {
      id: "discord",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Join the Spyrothon Discord at{" "}
              <span className={styles.textEmphasis}>discord.gg/fCvfnfk</span>
              {" (!discord)"}.
            </>
          }
        />
      ),
    },
    {
      id: "twitter",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Follow us on Twitter at <span className={styles.textEmphasis}>@spyrothon</span>
              {" (!twitter)"}.
            </>
          }
        />
      ),
    },
    {
      id: "current-event",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              You're watching <span className={styles.textEmphasis}>Spyrothon 8!</span>, running
              August 20-21, 2022.
            </>
          }
        />
      ),
    },
    {
      id: "youtube",
      content: () => (
        <OmnibarPlainText
          text={
            <>
              Subscribe to the <span className={styles.textEmphasis}>Spyrothon</span> YouTube
              channel to find previous events and miscellaneous videos{"(!youtube)"}.
            </>
          }
        />
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => setCurrentIndex((currentIndex) => currentIndex + 1), 20000);
  }, []);
  const currentSection = sections[currentIndex % sections.length];

  const transitions = useTransition(currentSection, {
    keys: (item) => item.id,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  return (
    <div className={classNames(styles.omnibar, className)}>
      {schedule?.logoUrl != null ? (
        <div className={styles.logo}>
          <img src={schedule?.logoUrl} height={54} />
        </div>
      ) : null}
      <div className={styles.mainContent}>
        {transitions((style, item) => (
          <animated.div style={style} className={styles.section}>
            {item.content()}
          </animated.div>
        ))}
      </div>
    </div>
  );
}
