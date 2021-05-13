import React, { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

const cardSizes = {
  single: styles.single,
  packed: styles.packed,
};

interface Props {
  size?: keyof typeof cardSizes;
}

const Card = (props: PropsWithChildren<Props>): JSX.Element => {
  const { children, size = "single" } = props;

  return <div className={`${styles.card} ${cardSizes[size]}`}>{children}</div>;
};

export default Card;
