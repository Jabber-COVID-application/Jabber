import React from "react";
import styles from "./Input.module.scss";
import { Control, RegisterOptions, useController } from "react-hook-form";

interface Props {
  name: string;
  control: Control;
  rules?: RegisterOptions;
  defaultValue?: string;

  label?: string;
  type?: string;
  placeholder?: string;

  disabled?: boolean;
  className?: string;
}

const Input = (props: Props): JSX.Element => {
  const {
    name,
    control,
    rules = {},
    defaultValue = "",

    label,
    type = "text",
    placeholder,

    disabled = false,
    className = "",
  } = props;

  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields, isSubmitting },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <div className={styles.input}>
      <div className={styles.above}>
        {label && <label htmlFor={name}>{label}</label>}
        <p className={`${styles.errorMessage} ${error ? styles.visible : ""}`}>
          {error?.message}
        </p>
      </div>

      <input
        ref={ref}
        type={type}
        placeholder={placeholder || ""}
        className={`
          ${invalid || error ? styles.error : ""}
          ${className}
        `}
        disabled={disabled || isSubmitting}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
