import React, { PropsWithChildren } from "react";
import Sidebar from "../sidebar/Sidebar";
import styles from "./SidebarLayout.module.scss";

interface Props {}

const SidebarLayout = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children } = props;

  return (
    <main className={styles.fullLayout}>
      <Sidebar />
      {children}
    </main>
  );
};

export default SidebarLayout;
