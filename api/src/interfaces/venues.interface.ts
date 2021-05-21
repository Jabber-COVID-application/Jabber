import { Address } from './misc.interface';

export interface Venue {
  _id: string;
  name: string;
  owner: string;
  active: boolean;
  address: Address;
}
