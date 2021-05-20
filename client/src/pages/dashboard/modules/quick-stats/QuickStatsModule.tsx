import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Card from "../../../../components/atoms/card/Card";
import { useStore } from "../../../../store";
import styles from "./QuickStatsModule.module.scss";

const QuickStatsModule = observer(
  (): JSX.Element => {
    const { stats } = useStore();

    useEffect(() => {
      stats.populate();
    }, []);

    return (
      <Card size="packed" label="Quick Stats" className={styles.quickStats}>
        <div className={styles.statsBox}>
          <p className={styles.label}>Total Cases</p>
          <h3>{stats.nationalStats?.cases.toLocaleString()}</h3>
        </div>
        <div className={styles.statsBox}>
          <p className={styles.label}>Total Deaths</p>
          <h3>{stats.nationalStats?.deaths.toLocaleString()}</h3>
        </div>
        <div className={styles.statsBox}>
          <p className={styles.label}>Total Tests</p>
          <h3>{stats.nationalStats?.tests.toLocaleString()}</h3>
        </div>
      </Card>
    );
  }
);

export default QuickStatsModule;
