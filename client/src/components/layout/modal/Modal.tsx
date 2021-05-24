import React from "react";
import styles from "./Modal.module.scss";
import Content from "../../atoms/content/Content";
import Column from "../../atoms/column/Column";
import Card from "../../atoms/card/Card";
import ScrollLockerProvider, {
  useScrollLocker,
} from "../scroll-locker/ScrollLocker";
import { useEffect } from "react";
import { PropsWithChildren } from "react";
import CrossIcon from "../../../assets/svgs/cross.svg";

interface Props {
  width?: number;
  close?: () => void;
  className?: string;
}

const Modal = (props: PropsWithChildren<Props>): JSX.Element => {
  const { width, close, className = "", children } = props;

  const { setIsLocked } = useScrollLocker();

  useEffect(() => {
    setIsLocked(true);

    return () => {
      setIsLocked(false);
    };
  }, []);

  return (
    <ScrollLockerProvider>
      <Content className={`${styles.wrapper} ${className}`}>
        <Column width={width}>
          <Card className={styles.modalCard}>
            {close && (
              <button onClick={() => close()} className={styles.close}>
                <img src={CrossIcon} alt="Close Modal" />
              </button>
            )}

            {children}
          </Card>
        </Column>
      </Content>
    </ScrollLockerProvider>
  );
};

export default Modal;
