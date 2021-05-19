import React from "react";

import Card from "../../components/atoms/card/Card";
import Column from "../../components/atoms/column/Column";
import RolloutEstimateModule from "./modules/rollout-estimate/RolloutEstimateModule";
import Content from "../../components/atoms/content/Content";

const Dashboard = (): JSX.Element => {
  return (
    <Content>
      <Column width={2 / 3}>
        <Card size="packed" label="Quick Stats">
          <h4>Login</h4>
        </Card>
        <Card size="packed" label="Quick Stats">
          <h4>Login</h4>
        </Card>
      </Column>
      <Column width={2 / 5}>
        <RolloutEstimateModule />
        <Card size="packed" label="Rollout Estimate">
          <h4>Login</h4>
        </Card>
      </Column>
    </Content>
  );
};

export default Dashboard;
