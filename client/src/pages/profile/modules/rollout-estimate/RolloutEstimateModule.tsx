import React from "react";
import Card from "../../../../components/atoms/card/Card";
import Button from "../../../../components/atoms/button/Button";

const RolloutEstimateModule = (): JSX.Element => {
  /**
   * TODO - Change 'fill out details' to 'change details' when already filled out
   */

  return (
    <Card size="packed" label="Rollout Estimate">
      <Button styleType="outline" size="small">
        Fill out my details
      </Button>
    </Card>
  );
};

export default RolloutEstimateModule;
