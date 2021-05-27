import React, { useCallback, useEffect, useState } from "react";
import Content from "../../../components/atoms/content/Content";
import Column from "../../../components/atoms/column/Column";
import { observer } from "mobx-react";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../store";
import InitialHeader from "./components/initial-header/InitialHeader";
import Card from "../../../components/atoms/card/Card";
import Button from "../../../components/atoms/button/Button";
import styles from "./Checkin.module.scss";
import CheckedInHeader from "./components/checked-in-header/CheckedInHeader";
import TimeRange from "./components/time-range/TimeRange";
import Spinner from "../../../components/layout/loader/spinner/Spinner";

interface Params {
  venueId: string;
}

enum VisitStatus {
  LOADING = "LOADING",
  NO_VENUE = "NO_VENUE",
  NO_VISIT = "NO_VISIT",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
}

const Checkin = observer(
  (): JSX.Element => {
    const { venues, visits } = useStore();
    const { venueId } = useParams<Params>();
    const history = useHistory();

    const [status, setStatus] = useState<VisitStatus>(VisitStatus.LOADING);
    const [visitId, setVisitId] = useState<string>();

    useEffect(() => {
      venues
        .fetchVenue(venueId)
        .then(() => {
          visits
            .getCurrentVisit(venueId)
            .then((visitId) => {
              setVisitId(visitId);
              setStatus(VisitStatus.CHECKED_IN);
            })
            .catch((e) => {
              setStatus(VisitStatus.NO_VISIT);
            });
        })
        .catch((e) => {
          setStatus(VisitStatus.NO_VENUE);
        });
    }, []);

    const checkIn = useCallback(() => {
      setStatus(VisitStatus.LOADING);
      visits
        .checkIn(venueId)
        .then((visitId) => {
          setVisitId(visitId);
          setStatus(VisitStatus.CHECKED_IN);
        })
        .catch((e) => {
          console.error(e);
          setStatus(VisitStatus.NO_VISIT);
        });
    }, []);

    const checkOut = useCallback(() => {
      setStatus(VisitStatus.LOADING);
      visits
        .checkOut(venueId)
        .then(() => {
          setStatus(VisitStatus.CHECKED_OUT);
        })
        .catch((e) => {
          console.error(e);
          setStatus(VisitStatus.CHECKED_IN);
        });
    }, []);

    const renderContent = useCallback(() => {
      switch (status) {
        case VisitStatus.LOADING:
          return <Spinner size="medium" />;
        case VisitStatus.NO_VENUE:
          return (
            <>
              <div>Venue not found.</div>
              <Button onClick={() => history.push("/dashboard")}>
                Go home
              </Button>
            </>
          );
        case VisitStatus.NO_VISIT:
          return (
            <>
              <InitialHeader venue={venueId} />
              <Button onClick={checkIn}>Check in</Button>
            </>
          );
        case VisitStatus.CHECKED_IN:
          return (
            <>
              <CheckedInHeader venue={venueId} visit={visitId || ""} />
              <TimeRange visit={visitId || ""} />
              <Button onClick={checkOut}>Check out</Button>
            </>
          );
        case VisitStatus.CHECKED_OUT:
          return (
            <>
              <CheckedInHeader venue={venueId} visit={visitId || ""} />
              <TimeRange visit={visitId || ""} />
              <Button onClick={() => history.push("/dashboard")}>
                Go home
              </Button>
            </>
          );
      }
    }, [status]);

    return (
      <Content centered>
        <Column width={1 / 2}>
          <Card className={styles.visit}>{renderContent()}</Card>
        </Column>
      </Content>
    );
  }
);

export default Checkin;
