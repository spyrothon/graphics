import * as React from "react";

import { InputWrapper, InputWrapperPassthroughProps } from "./InputWrapper";

import styles from "./SelectInput.module.css";

export type SelectInputProps<T> = {
  value?: T;
  items: T[];
  itemToString: (item: T) => string;
  includeEmpty?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
  onChange: (item?: T) => unknown;
} & InputWrapperPassthroughProps;

export function SelectInput<T>(props: SelectInputProps<T>) {
  const {
    name,
    label,
    note,
    className,
    onChange,
    value,
    items,
    itemToString,
    includeEmpty = true,
    allowEmpty = false,
    emptyLabel = "Select an Option",
    ...comboboxProps
  } = props;

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const entry = items.find((item) => itemToString(item) === event.target.value);
    onChange(entry);
  }

  return (
    <InputWrapper name={name} label={label} note={note} className={className} {...comboboxProps}>
      <select
        className={styles.input}
        value={value != null ? itemToString(value) : ""}
        onChange={handleChange}>
        {includeEmpty ? (
          <option value="" disabled={!allowEmpty}>
            {emptyLabel}
          </option>
        ) : null}
        {items.map((item) => {
          const string = itemToString(item);
          return (
            <option key={string} value={string}>
              {string}
            </option>
          );
        })}
      </select>
    </InputWrapper>
  );
}
