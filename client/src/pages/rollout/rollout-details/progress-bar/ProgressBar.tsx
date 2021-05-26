import React from "react";
import Card from "../../../../components/atoms/card/Card";
import styles from "./ProgressBar.module.scss";

interface Props {
  step: number;
  total: number;
}

const ProgressBar = (props: Props): JSX.Element => {
  const { step, total } = props;

  const renderProgress = () =>
    Array(total)
      .fill(1)
      .map((number, index) => (
        <>
          <div
            className={`${styles.step} ${index < step ? styles.completed : ""}`}
          />
          {index < total - 1 && (
            <div
              className={`${styles.line} ${
                index < step ? styles.completed : ""
              }`}
            />
          )}
        </>
      ));

  return (
    <Card size="packed" label="Progress">
      <div className={styles.progress}>{renderProgress()}</div>
    </Card>
  );
};

export default ProgressBar;
