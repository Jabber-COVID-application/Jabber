import { Address } from "./misc.types";

export interface Venue {
  _id: string;
  name: string;
  owner: string;
  active: boolean;
  address: Address;
}

export interface Venues {
  [_id: string]: Venue;
}
