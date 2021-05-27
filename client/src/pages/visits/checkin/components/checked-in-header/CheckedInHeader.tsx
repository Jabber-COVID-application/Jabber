import { observer } from "mobx-react";
import React, { useState } from "react";
import { useStore } from "../../../../../store";
import styles from "./CheckedInHeader.module.scss";
import BigTick from "../../../../../assets/svgs/big-tick.svg";

interface Props {
  venue: string;
  visit: string;
}

const CheckedInHeader = observer(
  (props: Props): JSX.Element => {
    const { venue, visit } = props;

    const { venues, visits } = useStore();

    const [date] = useState<string>(
      new Date(visits.visits[visit]?.checkin || "").toLocaleDateString(
        navigator.language,
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    );

    return (
      <div className={styles.header}>
        <div className={styles.circle}>
          <img src={BigTick} alt="Tick" />
        </div>
        <div className={styles.text}>
          <h5 className={styles.title}>{venues.venues[venue]?.name}</h5>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    );
  }
);

export default CheckedInHeader;
