import * as React from "react";
import DatePicker from "react-datepicker";

import { InputWrapper, InputWrapperPassthroughProps } from "./InputWrapper";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import styles from "./TextInput.module.css";

export type DateTimeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value?: Date;
  onChange: (date: Date) => void;
} & InputWrapperPassthroughProps;

export function DateTimeInput(props: DateTimeInputProps) {
  const { name, value, className, onChange, marginless, ...inputProps } = props;

  return (
    <InputWrapper name={name} className={className} marginless={marginless} {...inputProps}>
      <DatePicker
        className={styles.input}
        selected={value}
        onChange={onChange}
        showTimeInput
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </InputWrapper>
  );
}
