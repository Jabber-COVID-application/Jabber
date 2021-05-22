import React from "react";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import ProfileModule from "./modules/profile/ProfileModule";
import RolloutEstimateModule from "./modules/rollout-estimate/RolloutEstimateModule";
import VaccineCertificationModule from "./modules/vaccine-certification/VaccineCertificationModule";

const Profile = (): JSX.Element => {
  return (
    <Content>
      <Column width={1 / 2}>
        <ProfileModule />
        <RolloutEstimateModule />
        <VaccineCertificationModule />
      </Column>
    </Content>
  );
};

export default Profile;
