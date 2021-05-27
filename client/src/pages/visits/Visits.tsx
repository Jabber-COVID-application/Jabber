import React from "react";
import styles from "./Visits.module.scss";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import PastCheckins from "../dashboard/modules/past-checkins/PastCheckins";

interface Props {}

const Visits = (props: Props): JSX.Element => {
  return (
    <Content>
      <Column>
        <PastCheckins />
      </Column>
    </Content>
  );
};

export default Visits;
