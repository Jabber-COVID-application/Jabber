import { RolloutPhase, UserType } from "../types/user.types";

export const userTypePrettyName = (type: UserType) => {
  switch (type) {
    case UserType.GENERAL:
      return "General User";
    case UserType.VENUE_ADMIN:
      return "Venue Owner";
    case UserType.VACCINE_ADMIN:
      return "Vaccination Provider";
    case UserType.SUPER_ADMIN:
      return "Administrator";
  }
};

export const phaseToRolloutEstimate = (phase: RolloutPhase): string => {
  switch (phase) {
    case RolloutPhase.PHASE_1A:
      return "20th February";
    case RolloutPhase.PHASE_1B:
      return "22nd March";
    case RolloutPhase.PHASE_2A:
      return "3rd May";
    case RolloutPhase.PHASE_2B:
      return "1st August";
    case RolloutPhase.PHASE_3:
      return "November 1st";
  }
};
