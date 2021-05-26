import { Address } from "./misc.types";

export enum UserType {
  GENERAL = "GENERAL",
  VENUE_ADMIN = "VENUE_ADMIN",
  VACCINE_ADMIN = "VACCINE_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum RolloutPhase {
  PHASE_1A = "PHASE_1A",
  PHASE_1B = "PHASE_1B",
  PHASE_2A = "PHASE_2A",
  PHASE_2B = "PHASE_2B",
  PHASE_3 = "PHASE_3",
}

export interface User {
  _id: string;
  email: string;
  password: string;
  type: UserType;
  active: boolean;
  userDetails?: UserDetails;
  userAddress?: Address;
  rolloutDetails?: RolloutDetails;
}

export interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface RolloutDetails {
  phase?: RolloutPhase;
  frontLineWorker: boolean;
  agedCareDisabilityWorker: boolean;
  agedCareDisabilityResident: boolean;
  highRiskWorker: boolean;
  careWorker: boolean;
  disability: boolean;
  medicalCondition: boolean;
  closeContact: boolean;
  essentialTravel: boolean;
  aboriginalOrTorresStrait: boolean;
}
