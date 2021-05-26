import React, { useEffect } from "react";
import styles from "./Checkbox.module.scss";
import { Control, RegisterOptions, useController } from "react-hook-form";
import Tick from "../../../assets/svgs/tick.svg";

interface Props {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  defaultValue?: boolean;

  label?: string;

  disabled?: boolean;
  className?: string;
}

const Checkbox = (props: Props): JSX.Element => {
  const {
    name,
    control,
    rules = {},
    defaultValue = false,

    label,

    disabled = false,
    className = "",
  } = props;

  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid, error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, isSubmitting },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <label htmlFor={`input_${name}`} className={styles.wrapper}>
      <div className={styles.input}>
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled || isSubmitting}
          checked={value}
          id={`input_${name}`}
          {...inputProps}
        />
        <div
          className={`
            ${styles.fakeInput}
            ${invalid || error ? styles.error : ""}
            ${className}
          `}
        >
          <img src={Tick} alt="tick" className={styles.tick} />
        </div>
      </div>
      {label}
    </label>
  );
};

export default Checkbox;
