import React, { useEffect } from "react";
import { useStore } from "../../store";

const Dashboard = (): JSX.Element => {
  const { sidebar } = useStore();

  useEffect(() => {
    sidebar.selected = "dashboard";
  }, []);

  return <></>;
};

export default Dashboard;
