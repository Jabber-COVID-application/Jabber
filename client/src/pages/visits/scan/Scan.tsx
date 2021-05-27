import React from "react";
import styles from "./Scan.module.scss";
import Column from "../../../components/atoms/column/Column";
import Content from "../../../components/atoms/content/Content";
import Card from "../../../components/atoms/card/Card";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";

const Scan = (): JSX.Element => {
  const history = useHistory();

  const handleScan = (data: string | null) => {
    if (!data) return;

    console.log(data);

    const matches = data.match(
      /https:\/\/www\.jabb3r\.com\/visits\/([a-zA-Z0-9]+)/g
    );

    console.log(matches);

    if (matches) {
      history.push(matches[0]);
    }
  };

  const handleError = (err: string | null) => {
    console.error(err);
  };

  return (
    <Content>
      <Column width={1 / 2}>
        <Card size="packed" label="Scan Venue QR">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </Card>
      </Column>
    </Content>
  );
};

export default Scan;
