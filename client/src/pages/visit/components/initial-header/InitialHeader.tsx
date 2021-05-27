import { observer } from "mobx-react";
import React from "react";
import { useStore } from "../../../../store";
import styles from "./InitialHeader.module.scss";

interface Props {
  venue: string;
}

const InitialHeader = observer(
  (props: Props): JSX.Element => {
    const { venue } = props;

    const { venues } = useStore();

    return (
      <div className={styles.header}>
        <p className={styles.venue}>{venues.venues[venue]?.name}</p>
        <h4 className={styles.title}>Check in</h4>
        <p className={styles.text}>
          In the event of a confirmed case at this venue, we will contact you
          using your details.
        </p>
      </div>
    );
  }
);

export default InitialHeader;
