import React, { PropsWithChildren } from "react";
import styles from "./Content.module.scss";

interface Props {
  centered?: boolean;
}

const Content = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, centered } = props;

  return (
    <div className={`${styles.content} ${centered ? styles.centered : ""}`}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default Content;
