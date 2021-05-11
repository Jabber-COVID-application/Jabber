import {useLocalObservable} from 'mobx-react';
import React, {createContext, PropsWithChildren} from 'react';
import {RootState} from './root';

export const StateContext = createContext<RootState>(new RootState());

const StateProvider = (props: PropsWithChildren<{}>): JSX.Element => {
  const {children} = props;

  const state = useLocalObservable(() => new RootState());

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
