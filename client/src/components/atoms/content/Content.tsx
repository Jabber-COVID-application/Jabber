import React, { PropsWithChildren } from "react";
import styles from "./Content.module.scss";

interface Props {
  centered?: boolean;
  className?: string;
}

const Content = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, centered, className } = props;

  return (
    <div
      className={`${styles.content} ${
        centered ? styles.centered : ""
      } ${className}`}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default Content;
