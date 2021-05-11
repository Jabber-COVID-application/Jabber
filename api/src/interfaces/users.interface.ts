import {Schema} from "mongoose";

export enum UserType {
  GENERAL = "GENERAL",
  VENUE_ADMIN = "VENUE_ADMIN",
  VACCINE_ADMIN = "VACCINE_ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  _id: string;
  email: string;
  password: string;
  type: UserType;
  active: boolean;
  userDetails?: UserDetails;
  userAddress?: UserAddress;
}


export interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface UserAddress {
  address1: string;
  address2?: string;
  city: string;
  postCode: string;
  state: string;
}
