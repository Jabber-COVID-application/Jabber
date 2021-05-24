import React from "react";
import { useCallback } from "react";
import Column from "../../components/atoms/column/Column";
import Content from "../../components/atoms/content/Content";
import { useStore } from "../../store";
import { UserType } from "../../types/user.types";
import ProfileModule from "./modules/profile/ProfileModule";
import RolloutEstimateModule from "./modules/rollout-estimate/RolloutEstimateModule";
import VaccineCertificationModule from "./modules/vaccine-certification/VaccineCertificationModule";
import VenuesModule from "./modules/venues/VenuesModule";

const Profile = (): JSX.Element => {
  const { user } = useStore();

  const renderProfileModules = useCallback(() => {
    switch (user.type) {
      case UserType.GENERAL:
        return (
          <>
            <RolloutEstimateModule />
            <VaccineCertificationModule />
          </>
        );
      case UserType.VENUE_ADMIN:
        return (
          <>
            <VenuesModule />
          </>
        );
    }
  }, []);

  return (
    <Content>
      <Column width={1 / 2}>
        <ProfileModule />
        {renderProfileModules()}
      </Column>
    </Content>
  );
};

export default Profile;
