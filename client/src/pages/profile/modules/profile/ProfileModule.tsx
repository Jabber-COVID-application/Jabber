import { observer } from "mobx-react";
import React from "react";
import Card from "../../../../components/atoms/card/Card";
import { useStore } from "../../../../store";
import styles from "./ProfileModule.module.scss";
import UserIcon from "../../../../assets/images/user.png";
import Button from "../../../../components/atoms/button/Button";

const ProfileModule = observer(
  (): JSX.Element => {
    const { user, auth } = useStore();

    /**
     * TODO - User Details Edit Modals
     */

    return (
      <Card size="packed" label="Your Profile" className={styles.profile}>
        <div className={styles.user}>
          <img src={UserIcon} className={styles.icon} />

          <div className={styles.details}>
            <h5>{user.fullName}</h5>
            <p>Uncertified</p>
          </div>
        </div>

        <Button
          styleType="outline"
          size="small"
          className={styles.logoutButton}
          onClick={() => auth.logout()}
        >
          Log out
        </Button>
      </Card>
    );
  }
);

export default ProfileModule;
