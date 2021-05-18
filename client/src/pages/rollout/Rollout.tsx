import React, { useEffect } from "react";
import { useStore } from "../../store";

const Rollout = (): JSX.Element => {
  const { sidebar } = useStore();

  useEffect(() => {
    sidebar.selected = "rollout";
  }, []);

  return <></>;
};

export default Rollout;
