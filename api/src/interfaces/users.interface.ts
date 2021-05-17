import { ObjectId } from 'mongoose';

export enum UserType {
  GENERAL = 'GENERAL',
  VENUE_ADMIN = 'VENUE_ADMIN',
  VACCINE_ADMIN = 'VACCINE_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface User {
  _id: string;
  email: string;
  password: string;
  type: UserType;
  active: boolean;
  userDetails?: UserDetails;
  userAddress?: Location;
  visits?: Visit[];
}

export interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface Location {
  address1: string;
  address2?: string;
  city: string;
  postCode: string;
  state: string;
}

export interface Visit {
  venue: ObjectId;
  checkin: Date;
  checkout: Date;
}
