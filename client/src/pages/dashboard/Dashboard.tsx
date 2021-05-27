import React from "react";
import Card from "../../components/atoms/card/Card";
import Column from "../../components/atoms/column/Column";
import RolloutEstimateModule from "./modules/rollout-estimate/RolloutEstimateModule";
import Content from "../../components/atoms/content/Content";
import QuickStatsModule from "./modules/quick-stats/QuickStatsModule";
import PastCheckins from "./modules/past-checkins/PastCheckins";

const Dashboard = (): JSX.Element => {
  return (
    <Content>
      <Column width={2 / 3}>
        <QuickStatsModule />
        <PastCheckins />
      </Column>
      <Column width={2 / 5}>
        <RolloutEstimateModule />
      </Column>
    </Content>
  );
};

export default Dashboard;
