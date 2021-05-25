import { RootStore } from "./root";
import { makeAutoObservable } from "mobx";
import { User, UserDetails, UserType, Visit } from "../types/user.types";
import { Address } from "../types/misc.types";

export class UserStore {
  root: RootStore;

  id?: string;
  email?: string;
  type?: UserType;

  userDetails?: UserDetails;
  userAddress?: Address;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
  }

  populate(user: User) {
    if (user._id) this.id = user._id;
    if (user.email) this.email = user.email;
    if (user.type) this.type = user.type;
    if (user.userDetails) this.userDetails = user.userDetails;
    if (user.userAddress) this.userAddress = user.userAddress;
  }

  clear() {
    this.id = undefined;
    this.email = undefined;
    this.type = undefined;
    this.userDetails = undefined;
    this.userAddress = undefined;
  }

  get fullName() {
    return `${this.userDetails?.firstName || ""} ${
      this.userDetails?.lastName || ""
    }`;
  }
}
