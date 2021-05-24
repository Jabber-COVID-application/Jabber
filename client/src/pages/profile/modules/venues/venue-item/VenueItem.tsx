import React from "react";
import { useState } from "react";
import styles from "./VenueItem.module.scss";
import VenueQRModal from "./venue-qr-modal/VenueQRModal";

interface Props {
  name: string;
  address: string;
  id: string;
}

const VenueItem = (props: Props): JSX.Element => {
  const { name, address } = props;

  const [isQRModalVisible, setIsQRModalVisible] = useState<boolean>(false);

  return (
    <>
      <div className={styles.venue} onClick={() => setIsQRModalVisible(true)}>
        <p className={styles.name}>{name}</p>
        <p className={styles.address}>{address}</p>
      </div>

      {isQRModalVisible && (
        <VenueQRModal close={() => setIsQRModalVisible(false)} {...props} />
      )}
    </>
  );
};

export default VenueItem;
