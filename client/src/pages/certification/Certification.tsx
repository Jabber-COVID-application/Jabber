import React, { useEffect } from "react";
import Card from "../../components/atoms/card/Card";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../store";
import { UserType } from "../../types/user.types";
import Button from "../../components/atoms/button/Button";
import { observer } from "mobx-react";
import styles from "./Certification.module.scss";

interface Params {
  userId: string;
}

const Certification = observer(
  (): JSX.Element => {
    const { user, certification } = useStore();

    const { userId } = useParams<Params>();
    const history = useHistory();

    useEffect(() => {
      if (
        user.type !== UserType.VACCINE_ADMIN &&
        user.type !== UserType.VENUE_ADMIN
      ) {
        history.push("/dashboard");
      }

      certification.getUser(userId).catch((e) => {
        console.error(e);
        // history.push("/dashboard");
      });
    }, []);

    const handleCertifyUser = () => {
      certification.certifyUser(userId);
    };

    return (
      <Content>
        <Column width={1 / 2}>
          <Card
            size="packed"
            label="Vaccine Certification"
            className={styles.certification}
          >
            {certification.currentUser?.vaccineCertification ? (
              <>
                <h5>{`This user is was certified on ${new Date(
                  certification.currentUser.vaccineCertification.date
                ).toLocaleDateString(navigator.language, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}.`}</h5>
                <Button onClick={() => history.push("/dashboard")}>
                  Go to dashboard
                </Button>
              </>
            ) : user.type === UserType.VACCINE_ADMIN ? (
              <>
                <h5>
                  {certification.currentUser?.userDetails?.firstName}{" "}
                  {certification.currentUser?.userDetails?.lastName}
                </h5>

                <Button onClick={handleCertifyUser}>Certify user</Button>
              </>
            ) : (
              <>
                <h5>This user is not certified.</h5>
                <Button onClick={() => history.push("/dashboard")}>
                  Go to dashboard
                </Button>
              </>
            )}
          </Card>
        </Column>
      </Content>
    );
  }
);

export default Certification;
