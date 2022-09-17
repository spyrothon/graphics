import * as React from "react";
import classNames from "classnames";

import {
  InputWrapper,
  InputWrapperPassthroughProps,
  withoutInputWrapperProps,
} from "./InputWrapper";

import styles from "./TextInput.module.css";

type CommonProps = {
  value?: string;
  placeholder?: string;
  label?: string;
};

export type TextInputProps = (
  | ({ type?: "text" | "email" | "password" } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({ type: "textarea" } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
) &
  CommonProps &
  InputWrapperPassthroughProps;

export function TextInput(props: TextInputProps) {
  const { name, label, type = "text", note, className, value, marginless, ...inputProps } = props;

  const input = (() => {
    switch (props.type) {
      case "textarea":
        return (
          <textarea
            className={classNames(styles.input, styles.multiline)}
            name={name}
            rows={props.rows ?? 4}
            value={value ?? ""}
            {...withoutInputWrapperProps(props)}
          />
        );
      default:
        return (
          <input
            className={styles.input}
            name={name}
            type={type}
            value={value ?? ""}
            {...withoutInputWrapperProps(props)}
          />
        );
    }
  })();

  return (
    <InputWrapper
      name={name}
      label={label}
      note={note}
      className={className}
      marginless={marginless}
      {...inputProps}>
      {input}
    </InputWrapper>
  );
}
