import { observer } from "mobx-react";
import React from "react";
import Card from "../../../../components/atoms/card/Card";
import { useStore } from "../../../../store";
import styles from "./VaccineCertificationModule.module.scss";
import QRCode from "qrcode.react";

const VaccineCertificationModule = observer(
  (): JSX.Element => {
    const { user } = useStore();

    return (
      <Card size="packed" label="Vaccine Certification">
        <div className={styles.certification}>
          {user.vaccineCertification ? (
            <div className={styles.text}>
              <p>
                <strong>You are certified!</strong>
              </p>
              <p>Show the following QR code to provide proof of vaccination.</p>
            </div>
          ) : (
            <div className={styles.text}>
              <p>
                <strong>You are currently uncertified.</strong>
              </p>
              <p>
                Show the following QR code when you get vaccinated to get
                certified.
              </p>
            </div>
          )}

          {user.id && (
            <div className={styles.code}>
              <QRCode
                value={`https://www.jabb3r.com/certification/${user.id}`}
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
