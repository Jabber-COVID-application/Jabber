import { makeAutoObservable } from "mobx";
import axios, { AxiosInstance } from "axios";
import { UserStore } from "./user";

export class RootStore {
  user: UserStore;
  transportLayer: AxiosInstance;

  constructor() {
    makeAutoObservable(this);

    this.transportLayer = axios.create({
      baseURL: process.env.API_URL,
    });

    this.user = new UserStore(this, this.transportLayer);
  }
}
