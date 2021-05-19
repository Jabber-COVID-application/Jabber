import React from "react";
import Button from "../../../../components/atoms/button/Button";
import Card from "../../../../components/atoms/card/Card";
import styles from "./RolloutEstimateModule.module.scss";

const RolloutEstimateModule = (): JSX.Element => {
  /**
   * TODO: - Add Logic for Assessing whether user has added details and has rollout estimate
   */

  return (
    <Card size="packed" label="Rollout Estimate">
      <p className={styles.text}>
        To get your <strong>Rollout Estimate</strong>, we need to know a little
        more about your situation.
      </p>
      <Button styleType="outline" size="small">
        Fill out my details
      </Button>
    </Card>
  );
};

export default RolloutEstimateModule;
