import React, { PropsWithChildren } from "react";
import Spinner from "./spinner/Spinner";

interface Props {
  loading?: boolean;
}

const Loader = (props: PropsWithChildren<Props>): JSX.Element => {
  const { loading, children } = props;

  return loading ? <Spinner /> : <>{children}</>;
};

export default Loader;
