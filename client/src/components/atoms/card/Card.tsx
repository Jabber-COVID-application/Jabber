import React, { PropsWithChildren } from "react";
import styles from "./Card.module.scss";

const cardSizes = {
  single: styles.single,
  packed: styles.packed,
};

interface Props {
  label?: string;
  size?: keyof typeof cardSizes;
  className?: string;
  wrapperClassName?: string;
}

const Card = (props: PropsWithChildren<Props>): JSX.Element => {
  const {
    children,
    label,
    size = "single",
    className = "",
    wrapperClassName = "",
  } = props;

  return (
    <div className={`${styles.wrapper} ${wrapperClassName}`}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={`${styles.card} ${cardSizes[size]} ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
