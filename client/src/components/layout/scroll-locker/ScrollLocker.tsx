import React, { createContext, PropsWithChildren, useContext } from "react";
import { useState } from "react";
import styles from "./ScrollLocker.module.scss";

interface ScrollLockerValue {
  isLocked: boolean;
  setIsLocked: (val: boolean) => void;
}

const ScrollLockerContext = createContext<ScrollLockerValue>({
  isLocked: false,
  setIsLocked: (val) => {},
});

export const useScrollLocker = () => useContext(ScrollLockerContext);

const ScrollLockerProvider = (props: PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;

  const [isLocked, setIsLocked] = useState<boolean>(false);

  return (
    <div className={`${styles.scrollLocker} ${isLocked ? styles.locked : ""}`}>
      <ScrollLockerContext.Provider value={{ isLocked, setIsLocked }}>
        {children}
      </ScrollLockerContext.Provider>
    </div>
  );
};

export default ScrollLockerProvider;
