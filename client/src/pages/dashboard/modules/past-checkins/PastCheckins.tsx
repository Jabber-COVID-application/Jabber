import React from "react";
import Card from "../../../../components/atoms/card/Card";
import { useStore } from "../../../../store";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "../../../../components/layout/loader/spinner/Spinner";
import styles from "./PastCheckins.module.scss";
import { useCallback } from "react";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import Button from "../../../../components/atoms/button/Button";
import { useHistory } from "react-router-dom";

interface Props {}

const PastCheckins = observer(
  (props: Props): JSX.Element => {
    const { visits, venues } = useStore();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      setIsLoading(true);
      visits.fetchVisits().then(() => {
        setIsLoading(false);
      });
    }, []);

    const renderCheckins = useCallback(() => {
      if (Object.values(visits.visits).length === 0)
        return <p className={styles.noCheckins}>No checkins yet.</p>;

      return visits.visitsSorted.map((visit) => (
        <div className={styles.checkin}>
          <div className={styles.left}>
            <p className={styles.venueName}>
              {venues.venues[visit.venue].name}
            </p>
            <p className={styles.venueAddress}>
              {venues.venues[visit.venue].address.formatted}
            </p>
          </div>
          <div className={styles.right}>
            <p className={styles.visitDate}>
              Visited&nbsp;
              {new Date(visit.checkin).toLocaleDateString(navigator.language, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className={styles.visitTimeRange}>
              {new Date(visit.checkin).toLocaleTimeString(navigator.language, {
                timeStyle: "short",
              })}
              -
              {visit.checkout
                ? new Date(visit.checkout || "").toLocaleTimeString(
                    navigator.language,
                    {
                      timeStyle: "short",
                    }
                  )
                : "--:-- --"}
            </p>
          </div>
        </div>
      ));
    }, [visits]);

    return (
      <Card size="packed" label="Past Checkins" className={styles.pastCheckins}>
        {isLoading ? (
          <Spinner size="medium" />
        ) : (
          <div className={styles.checkins}>{renderCheckins()}</div>
        )}
        <Button
          onClick={() => history.push("/visits/scan")}
          size="small"
          styleType="outline"
        >
          Add visit
        </Button>
      </Card>
    );
  }
);

export default PastCheckins;
