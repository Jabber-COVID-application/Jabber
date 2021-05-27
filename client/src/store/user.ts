import { RootStore } from "./root";
import { makeAutoObservable } from "mobx";
import {
  RolloutDetails,
  User,
  UserDetails,
  UserType,
  VaccineCertification,
} from "../types/user.types";
import { Address } from "../types/misc.types";
import axiosInstance from "../transport";

export class UserStore {
  root: RootStore;

  id?: string;
  email?: string;
  type?: UserType;

  userDetails?: UserDetails;
  userAddress?: Address;
  rolloutDetails?: RolloutDetails;
  vaccineCertification?: VaccineCertification;

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
    if (user.rolloutDetails) this.rolloutDetails = user.rolloutDetails;
    if (user.vaccineCertification)
      this.vaccineCertification = user.vaccineCertification;
  }

  async update(user: UpdateUserRequest) {
    return axiosInstance
      .put(`/users/${this.id}`, user)
      .then(({ status, data }) => {
        if (status !== 200) throw new Error("User not found");

        const user: User = data.data;
        this.populate(user);
      });
  }

  clear() {
    this.id = undefined;
    this.email = undefined;
    this.type = undefined;
    this.userDetails = undefined;
    this.userAddress = undefined;
    this.rolloutDetails = undefined;
    this.vaccineCertification = undefined;
  }

  get fullName() {
    return `${this.userDetails?.firstName || ""} ${
      this.userDetails?.lastName || ""
    }`;
  }
}

interface UpdateUserRequest {
  email?: string;
  password?: string;
  userDetails?: UserDetails;
  userAddress?: Address;
  rolloutDetails?: RolloutDetails;
}
