import React from "react";
import Card from "../../components/atoms/card/Card";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import UserIcon from "../../assets/images/user.png";
import styles from "./Profile.module.scss";
import { useStore } from "../../store";
import QR from "../../assets/svgs/QRcode.svg";

const Profile = (): JSX.Element => {

  const {user, auth}=useStore();
  //**********Question: cerified? **********
  //******************TODO***************/
  //Add password and phone number field
  //perform action on fill out details button
  return (
    <Content>
      <Column width={1 / 2}>
        <Card size = "packed" label = "Your profile" className={styles.yourProfile}>
          <div className={styles.iconFullName}>
            <img src= {UserIcon} className={styles.userIcon}/>
            <div>
              <h4 className={styles.userFullName}> {user.fullName} </h4>
              <h6 className={styles.certified}>UNCERTIFIED</h6>
            </div>
          </div>
          <div>
            <hr className={styles.line}/>
          </div>
          <div className={styles.inputField}>
            <h6 className={styles.inputHeader}>EMAIL</h6>
            <Card className={styles.inputValue}>{user.email}</Card>
          </div>
          <div className={styles.inputField}>
            <h6 className={styles.inputHeader}>PHONE</h6>
            <Card className={styles.inputValue}>PHONE</Card>
          </div>
          <div className={styles.inputField}>
            <h6 className={styles.inputHeader}>PASSWORD</h6>
            <Card className={styles.inputValue}>PASSWORD</Card>
          </div>
          <Button styleType="outline" size="medium" className={styles.button} onClick={()=>auth.logout()}>log Out</Button>
        </Card>
        <Card size="packed" label="Rollout Estimate">
          <Button styleType="outline" size="medium">Fill out my details</Button>
        </Card>
        <Card size="packed" label="VACCINE CERTIFICATION">
            <div className={styles.certificationProfile}>
              <p className={styles.textCertification}>You are currently uncertified</p>
              <div>
                <img src = {QR} className={styles.QRCODE}/>
              </div>
              <p className={styles.textCertification}>Show the following QR code when <br/> you get vaccination to get certified</p>
            </div>
            
        </Card>

      </Column>
        
    </Content>
  );
};

export default Profile;
