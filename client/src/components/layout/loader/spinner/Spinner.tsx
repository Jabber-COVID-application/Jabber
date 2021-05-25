import React from "react";
import styles from "./Spinner.module.scss";

const spinnerSizes = {
  large: styles.large,
  medium: styles.medium,
  small: styles.small,
};

interface Props {
  size?: keyof typeof spinnerSizes;
}

const Spinner = (props: Props): JSX.Element => {
  const { size = "large" } = props;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.spinner} ${spinnerSizes[size]}`} />
    </div>
  );
};

export default Spinner;
