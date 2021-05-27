import { observer } from "mobx-react";
import React, { useEffect } from "react";
import Card from "../../../../components/atoms/card/Card";
import Spinner from "../../../../components/layout/loader/spinner/Spinner";
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
          {stats.nationalStats?.cases ? (
            <h3>{stats.nationalStats?.cases.toLocaleString()}</h3>
          ) : (
            <Spinner size="small" />
          )}
        </div>
        <div className={styles.statsBox}>
          <p className={styles.label}>Total Deaths</p>
          {stats.nationalStats?.deaths ? (
            <h3>{stats.nationalStats?.deaths.toLocaleString()}</h3>
          ) : (
            <Spinner size="small" />
          )}
        </div>
        <div className={styles.statsBox}>
          <p className={styles.label}>Total Tests</p>
          {stats.nationalStats?.tests ? (
            <h3>{stats.nationalStats?.tests.toLocaleString()}</h3>
          ) : (
            <Spinner size="small" />
          )}
        </div>
      </Card>
    );
  }
);

export default QuickStatsModule;
