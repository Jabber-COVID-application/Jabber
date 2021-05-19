import React, { PropsWithChildren } from "react";
import styles from "./NavbarLayout.module.scss";

interface Props {
  nav?: JSX.Element;
}

const NavbarLayout = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, nav } = props;

  return (
    <main className={styles.singleLayout}>
      {nav}
      {children}
    </main>
  );
};

export default NavbarLayout;
