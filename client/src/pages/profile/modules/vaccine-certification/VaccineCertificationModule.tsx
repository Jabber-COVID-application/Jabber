import { observer } from "mobx-react";
import React from "react";
import Card from "../../../../components/atoms/card/Card";
import { useStore } from "../../../../store";
import styles from "./VaccineCertificationModule.module.scss";
import QRCode from "qrcode.react";

const VaccineCertificationModule = observer(
  (): JSX.Element => {
    const { user } = useStore();

    /**
     * TODO - Change QR code to be part of a URL
     */

    return (
      <Card size="packed" label="Vaccine Certification">
        <div className={styles.certification}>
          <div className={styles.text}>
            <p>
              <strong>You are currently uncertified.</strong>
            </p>
            <p>
              Show the following QR code when you get vaccinated to get
              certified.
            </p>
          </div>

          {user.id && (
            <div className={styles.code}>
              <QRCode
                value={user.id}
                renderAs="svg"
                size={86}
                bgColor="transparent"
                fgColor="currentColor"
              />
            </div>
          )}
        </div>
      </Card>
    );
  }
);

export default VaccineCertificationModule;
