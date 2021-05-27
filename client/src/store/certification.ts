import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";
import axiosInstance from "../transport";
import { User } from "../types/user.types";

export class CertificationStore {
  root: RootStore;
  currentUser?: User;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
  }

  async getUser(userId: string) {
    return axiosInstance.get(`/users/${userId}`).then(({ status, data }) => {
      this.currentUser = data.data;
    });
  }

  async certifyUser(userId: string) {
    return axiosInstance
      .post(`/users/${userId}/certify`)
      .then(({ status, data }) => {
        this.currentUser = data.data;
      });
  }
}
