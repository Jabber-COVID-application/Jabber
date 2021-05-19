import React, { PropsWithChildren } from "react";
import styles from "./Column.module.scss";

interface Props {
  width?: number;
  className?: string;
}

const gridWidth = 1080;

const Column = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, width = 1, className = "" } = props;

  return (
    <div
      className={`${styles.column} ${className}`}
      style={{ maxWidth: `${Math.round(width * gridWidth)}px` }}
    >
      {children}
    </div>
  );
};

export default Column;
