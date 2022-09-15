import * as React from "react";

import { formatDuration, parseDuration } from "./utils/DurationUtils";
import { TextInput, TextInputProps } from "./TextInput";
import { InputWrapperPassthroughProps } from "./InputWrapper";

type CommonProps = {
  value?: number;
  placeholder?: string;
  label?: string;
  onChange: (value: number) => unknown;
};

type DurationInputProps = 
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | keyof CommonProps> &
  CommonProps &
  InputWrapperPassthroughProps;;

export function DurationInput(props: DurationInputProps) {
  const { value, onChange, ...otherProps } = props;

  const [renderedValue, setRenderedValue] = React.useState(() => formatDuration(value));

  React.useEffect(() => {
    setRenderedValue(formatDuration(value));
  }, [value]);

  // This only updates on blur because the string representation of the time
  // doesn't line up with the numeric representation, meaning updating the
  // value on every change will cause unusable formatting.
  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const duration = parseDuration(event.target.value);
    onChange(duration);
  }

  return (
    <TextInput
      {...otherProps}
      value={renderedValue}
      onBlur={handleBlur}
      placeholder="00:00:00"
      onChange={(event) => setRenderedValue(event.target.value)}
    />
  );
}
