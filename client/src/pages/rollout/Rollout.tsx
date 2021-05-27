import React from "react";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import RolloutEstimateModule from "./modules/rollout-estimate/RolloutEstimateModule";

const Rollout = (): JSX.Element => {
  return (
    <Content>
      <Column>
        <RolloutEstimateModule />
      </Column>
    </Content>
  );
};

export default Rollout;
