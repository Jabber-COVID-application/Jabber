import React, { PropsWithChildren } from "react";
import styles from "./Button.module.scss";

const buttonSizes = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const buttonTypes = {
  default: styles.default,
  outline: styles.outline,
};

interface Props {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  size?: keyof typeof buttonSizes;
  styleType?: keyof typeof buttonTypes;
  disabled?: boolean;
  className?: string;
}

const Button = (props: PropsWithChildren<Props>): JSX.Element => {
  const {
    type = "button",
    children,
    onClick,
    size = "medium",
    styleType = "default",
    disabled = false,
    className = "",
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${styles.button}
        ${buttonSizes[size]}
        ${buttonTypes[styleType]}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
