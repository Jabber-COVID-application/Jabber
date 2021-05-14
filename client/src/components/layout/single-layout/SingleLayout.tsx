import React, { PropsWithChildren } from "react";
import styles from "./SingleLayout.module.scss";

interface Props {
  nav?: JSX.Element;
}

const SingleLayout = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, nav } = props;

  return (
    <main className={styles.singleLayout}>
      {nav}
      <div className={styles.content}>
        <div className={styles.inner}>{children}</div>
      </div>
    </main>
  );
};

export default SingleLayout;
