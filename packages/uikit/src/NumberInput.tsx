import * as React from "react";

import { InputWrapper, InputWrapperPassthroughProps } from "./InputWrapper";

import styles from "./TextInput.module.css";

export type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: number;
} & InputWrapperPassthroughProps;

export function NumberInput(props: NumberInputProps) {
  const { name, value, className, marginless, ...inputProps } = props;

  return (
    <InputWrapper name={name} className={className} marginless={marginless} {...inputProps}>
      <input
        className={styles.input}
        type="number"
        name={name}
        value={value ?? ""}
        {...inputProps}
      />
    </InputWrapper>
  );
}
