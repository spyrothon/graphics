import * as React from "react";
import classNames from "classnames";

import styles from "./Text.module.css";

const TextSizes = {
  SIZE_32: styles.size32,
  SIZE_24: styles.size24,
  SIZE_20: styles.size20,
  SIZE_16: styles.size16,
  SIZE_14: styles.size14,
  SIZE_12: styles.size12,
};

const TextColors = {
  NORMAL: styles.colorNormal,
  MUTED: styles.colorMuted,
  LINK: styles.colorLink,
};

type TextProps = {
  size?: typeof TextSizes[keyof typeof TextSizes];
  color?: typeof TextColors[keyof typeof TextColors];
  marginless?: boolean;
  oneline?: boolean;
  smallCaps?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Text(props: TextProps) {
  const {
    size = TextSizes.SIZE_16,
    color = TextColors.NORMAL,
    marginless = false,
    oneline = false,
    smallCaps = false,
    className,
    children,
  } = props;

  return (
    <div
      className={classNames(styles.text, color, size, className, {
        [styles.oneline]: oneline,
        [styles.smallCaps]: smallCaps,
        [styles.marginless]: marginless,
      })}>
      {children}
    </div>
  );
}

Text.Sizes = TextSizes;
Text.Colors = TextColors;
