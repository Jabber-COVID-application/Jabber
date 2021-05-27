import React from "react";
import { RedirectProps, useLocation } from "react-router-dom";
import { Redirect } from "react-router";

interface LocationState {
  referrer?: string;
}

export const RedirectCatchPathAttempt = (props: RedirectProps): JSX.Element => {
  const { to } = props;
  const location = useLocation<LocationState>();

  return typeof to === "object" ? (
    <Redirect
      {...props}
      to={{ ...to, state: { referrer: location.pathname } }}
    />
  ) : (
    <Redirect
      {...props}
      to={{ pathname: to, state: { referrer: location.pathname } }}
    />
  );
};

export const RedirectToPathAttempt = (props: RedirectProps): JSX.Element => {
  const { to } = props;
  const location = useLocation<LocationState>();

  if (location.state?.referrer) {
    return typeof to === "object" ? (
      <Redirect
        {...props}
        to={{
          ...to,
          pathname: location.state.referrer,
          state: { referrer: undefined },
        }}
      />
    ) : (
      <Redirect
        {...props}
        to={{
          pathname: location.state.referrer,
          state: { referrer: undefined },
        }}
      />
    );
  }

  return <Redirect {...props} />;
};
