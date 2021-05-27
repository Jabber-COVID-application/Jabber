import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../../../store";
import styles from "./TimeRange.module.scss";
import { autorun } from "mobx";

interface Props {
  visit: string;
}

const TimeRange = observer(
  (props: Props): JSX.Element => {
    const { visit } = props;

    const { visits } = useStore();

    const [checkinTimeString, setCheckinTimeString] = useState<string>();
    const [checkoutTimeString, setCheckoutTimeString] = useState<string>();

    useEffect(
      () =>
        autorun(() => {
          setCheckinTimeString(
            new Date(
              visits.visits[visit]?.checkin || ""
            ).toLocaleTimeString(navigator.language, { timeStyle: "short" })
          );

          setCheckoutTimeString(
            visits.visits[visit].checkout
              ? new Date(
                  visits.visits[visit]?.checkout || ""
                ).toLocaleTimeString(navigator.language, { timeStyle: "short" })
              : "--:-- --"
          );
        }),
      []
    );

    return (
      <div className={styles.timeRange}>
        <div className={styles.timeWrapper}>
          <p className={styles.text}>Checked in</p>
          <h5 className={styles.time}>{checkinTimeString}</h5>
        </div>

        <div className={styles.line} />

        <div className={styles.timeWrapper}>
          <p className={styles.text}>Checked out</p>
          <h5 className={styles.time}>{checkoutTimeString}</h5>
        </div>
      </div>
    );
  }
);

export default TimeRange;
