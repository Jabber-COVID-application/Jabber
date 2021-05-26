import React from "react";
import styles from "./Radio.module.scss";
import { Control, RegisterOptions, useController } from "react-hook-form";

interface Props {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  value?: string;

  label?: string;

  disabled?: boolean;
  className?: string;
}

const Radio = (props: Props): JSX.Element => {
  const {
    name,
    control,
    rules = {},
    value = "",

    label,

    disabled = false,
    className = "",
  } = props;

  const {
    field: { ref, value: selected, ...inputProps },
    fieldState: { invalid, error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, isSubmitting },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <label htmlFor={`input_${name}_${value}`} className={styles.wrapper}>
      <div className={styles.input}>
        <input
          ref={ref}
          type="radio"
          disabled={disabled || isSubmitting}
          value={value}
          checked={value === selected}
          id={`input_${name}_${value}`}
          {...inputProps}
        />
        <div
          className={`
            ${styles.fakeInput}
            ${invalid || error ? styles.error : ""}
            ${className}
          `}
        />
      </div>
      {label}
    </label>
  );
};

export default Radio;
