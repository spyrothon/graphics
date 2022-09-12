import * as React from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

const ButtonColors = {
  DEFAULT: styles.colorDefault,
  PRIMARY: styles.colorPrimary,
};

const ButtonLooks = {
  FILLED: styles.lookFilled,
  OUTLINED: styles.lookOutlined,
};

const ButtonSizes = {
  SMALL: styles.sizeSmall,
  NORMAL: styles.sizeNormal,
  LARGE: styles.sizeLarge,
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: typeof ButtonColors[keyof typeof ButtonColors];
  size?: typeof ButtonSizes[keyof typeof ButtonSizes];
  look?: typeof ButtonLooks[keyof typeof ButtonLooks];
  icon?: boolean;
  fullwidth?: boolean;
};

export function Button(props: ButtonProps) {
  const {
    color = ButtonColors.PRIMARY,
    size = ButtonSizes.NORMAL,
    look = ButtonLooks.FILLED,
    fullwidth = false,
    icon = false,
    disabled = false,
    tabIndex = 0,
    children,
    onClick,
    className,
    ...extraProps
  } = props;

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!disabled) onClick?.(event);
      return false;
    },
    [disabled, onClick],
  );

  return (
    <button
      {...extraProps}
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
      type="button"
      tabIndex={tabIndex}
      className={classNames(styles.button, color, size, look, className, {
        [styles.isFullwidth]: fullwidth,
        [styles.icon]: icon,
      })}>
      {children}
    </button>
  );
}

Button.Colors = ButtonColors;
Button.Looks = ButtonLooks;
Button.Sizes = ButtonSizes;
