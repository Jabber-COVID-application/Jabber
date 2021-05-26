import React from "react";
import Button from "../../../../components/atoms/button/Button";
import Card from "../../../../components/atoms/card/Card";
import { useStore } from "../../../../store";
import styles from "./RolloutEstimateModule.module.scss";
import { useHistory } from "react-router-dom";
import { phaseToRolloutEstimate } from "../../../../utils/user.utils";
import { observer } from "mobx-react";

const RolloutEstimateModule = observer(
  (): JSX.Element => {
    const { user } = useStore();
    const history = useHistory();

    return (
      <Card size="packed" label="Rollout Estimate">
        {user.rolloutDetails?.phase ? (
          <>
            <h5>{phaseToRolloutEstimate(user.rolloutDetails.phase)}</h5>
            <p className={styles.textSmall}>
              This is an estimated eligibility date based on the details you
              provided. There is no guarantee that you will be eligible on this
              exact date.
            </p>
            <Button
              styleType="outline"
              size="small"
              onClick={() => history.push("/rollout/details")}
            >
              Change my details
            </Button>
          </>
        ) : (
          <>
            <p className={styles.text}>
              To get your <strong>Rollout Estimate</strong>, we need to know a
              little more about your situation.
            </p>
            <Button
              styleType="outline"
              size="small"
              onClick={() => history.push("/rollout/details")}
            >
              Fill out my details
            </Button>
          </>
        )}
      </Card>
    );
  }
);

export default RolloutEstimateModule;
