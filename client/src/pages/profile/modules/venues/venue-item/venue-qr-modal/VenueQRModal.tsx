import React from "react";
import Modal from "../../../../../../components/layout/modal/Modal";
import QRCode from "qrcode.react";
import { useRef } from "react";
import Button from "../../../../../../components/atoms/button/Button";
import { useReactToPrint } from "react-to-print";
import styles from "./VenueQRModal.module.scss";

interface Props {
  name: string;
  address: string;
  id: string;
  close: () => void;
}

const VenueQRModal = (props: Props): JSX.Element => {
  const { name, address, id, close } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  return (
    <Modal width={2 / 3} close={close}>
      <div ref={ref} className={styles.wrapper}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.address}>{address}</p>
        <QRCode
          value={`https://www.jabber.com/checkin/${id}`}
          renderAs="svg"
          size={512}
          bgColor="transparent"
          fgColor="currentColor"
        />
        <p className={styles.below}>Scan the above code to check in.</p>
      </div>
      <Button
        onClick={() => {
          handlePrint?.();
        }}
      >
        Print
      </Button>
    </Modal>
  );
};

export default VenueQRModal;
