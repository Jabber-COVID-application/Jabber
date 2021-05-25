import React, { PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { RedirectProps, useLocation } from "react-router-dom";
import { Redirect } from "react-router";
import { useEffect } from "react";

interface PathAttempt {
  pathAttempt?: string;
  setPathAttempt: (pathAttempt: string) => void;
}

const PathAttemptContext = createContext<PathAttempt>({
  setPathAttempt: () => {},
});

export const usePathAttempt = () => useContext(PathAttemptContext);

export const RedirectCatchPathAttempt = (props: RedirectProps): JSX.Element => {
  const location = useLocation();
  const { setPathAttempt } = usePathAttempt();

  useEffect(() => {
    setPathAttempt(location.pathname);
  }, []);

  return <Redirect {...props} />;
};

export const RedirectToPathAttempt = (props: RedirectProps): JSX.Element => {
  const { pathAttempt } = usePathAttempt();

  return pathAttempt ? (
    <Redirect {...props} to={pathAttempt} />
  ) : (
    <Redirect {...props} />
  );
};

const PathAttemptProvider = (props: PropsWithChildren<{}>): JSX.Element => {
  const { children } = props;

  const [pathAttempt, setPathAttempt] = useState<string>();

  return (
    <PathAttemptContext.Provider value={{ pathAttempt, setPathAttempt }}>
      {children}
    </PathAttemptContext.Provider>
  );
};

export default PathAttemptProvider;
