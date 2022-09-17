import * as React from "react";
import classNames from "classnames";
import { CheckSquare,Square } from "react-feather";

import { Text } from "./Text";

import styles from "./Checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  label: React.ReactNode;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
}

export function Checkbox(props: CheckboxProps) {
  const { checked, label, className, onChange } = props;
  const CheckIcon = checked ? CheckSquare : Square;

  const renderedLabel = typeof label === "string" ? <Text marginless>{label}</Text> : label;

  return (
    <label className={classNames(styles.container, className)}>
      <input className={styles.input} type="checkbox" onChange={onChange} checked={checked} />
      <CheckIcon className={styles.icon} size={16} strokeWidth="3" />
      <div className={styles.label}>{renderedLabel}</div>
    </label>
  );
}
