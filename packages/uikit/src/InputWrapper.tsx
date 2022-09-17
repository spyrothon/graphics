import * as React from "react";
import classNames from "classnames";

import { Text } from "./Text";

import styles from "./InputWrapper.module.css";

const InputWrapperSizes = {
  NORMAL: styles.sizeNormal,
  LARGE: styles.sizeLarge,
};

interface InputWrapperProps {
  size?: typeof InputWrapperSizes[keyof typeof InputWrapperSizes];
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
  note?: React.ReactNode;
  leader?: React.ReactNode;
  trailer?: React.ReactNode;
  marginless?: boolean;
  className?: string;
  children: React.ReactNode;
}

export type InputWrapperPassthroughProps = Omit<InputWrapperProps, "children">;

export function withoutInputWrapperProps<T extends InputWrapperPassthroughProps>(
  props: T,
): Omit<T, keyof InputWrapperPassthroughProps> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { size, label, name, required, note, leader, trailer, marginless, className, ...rest } =
    props;
  return rest;
}

export function InputWrapper(props: InputWrapperProps) {
  const {
    size = InputWrapperSizes.NORMAL,
    label,
    name,
    required,
    note,
    leader,
    trailer,
    marginless = false,
    className,
    children,
  } = props;

  return (
    <div
      className={classNames(styles.container, size, className, {
        [styles.marginless]: marginless,
      })}>
      {label != null && (
        <label className={styles.label} htmlFor={name}>
          {label}
          {required ? " *" : null}
        </label>
      )}
      <div className={styles.input}>
        {leader != null && <div className={styles.leader}>{leader}</div>}
        {children}
        {trailer != null && <div className={styles.trailer}>{trailer}</div>}
      </div>
      {note != null && (
        <Text
          className={styles.note}
          color={Text.Colors.MUTED}
          size={Text.Sizes.SIZE_14}
          marginless>
          {note}
        </Text>
      )}
    </div>
  );
}

InputWrapper.Sizes = InputWrapperSizes;
