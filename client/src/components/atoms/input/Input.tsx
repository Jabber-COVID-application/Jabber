import React, { ForwardedRef } from "react";
import styles from "./Input.module.scss";
import { ChangeHandler } from "react-hook-form";

interface Props {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange: ChangeHandler;
  onBlur?: ChangeHandler;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input = React.forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    const {
      name,
      type = "text",
      placeholder,
      label,
      onChange,
      onBlur,
      error = false,
      disabled = false,
      className = "",
    } = props;

    return (
      <div className={styles.input}>
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          type={type}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || ""}
          className={`
          ${error ? styles.error : ""}
          ${disabled ? styles.disabled : ""}
          ${className}
        `}
        />
      </div>
    );
  }
);

export default Input;
