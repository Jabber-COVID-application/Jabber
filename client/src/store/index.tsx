import { useLocalObservable } from "mobx-react";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { RootStore } from "./root";

const StoreContext = createContext<RootStore>(new RootStore());

export const useStore = () => useContext(StoreContext);

export const StoreProvider = (props: PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;

  const state = useLocalObservable(() => new RootStore());

  return (
    <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
  );
};
