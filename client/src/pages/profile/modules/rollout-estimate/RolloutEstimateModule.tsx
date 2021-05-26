import React from "react";
import Card from "../../../../components/atoms/card/Card";
import Button from "../../../../components/atoms/button/Button";
import { useStore } from "../../../../store";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";

const RolloutEstimateModule = observer(
  (): JSX.Element => {
    const { user } = useStore();
    const history = useHistory();

    return (
      <Card size="packed" label="Rollout Estimate">
        <Button
          styleType="outline"
          size="small"
          onClick={() => history.push("/rollout/details")}
        >
          {user.rolloutDetails?.phase
            ? "Change my details"
            : "Fill out my details"}
        </Button>
      </Card>
    );
  }
);

export default RolloutEstimateModule;
