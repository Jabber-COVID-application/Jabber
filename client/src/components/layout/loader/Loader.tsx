import React, { PropsWithChildren } from "react";
import styles from "./Loader.module.scss";

interface Props {
  loading?: boolean;
}

const Loader = (props: PropsWithChildren<Props>): JSX.Element => {
  const { loading, children } = props;

  return loading ? (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loader;
