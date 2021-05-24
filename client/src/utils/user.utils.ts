import { UserType } from "../types/user.types";

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
