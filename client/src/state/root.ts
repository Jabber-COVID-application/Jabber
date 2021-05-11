import {makeAutoObservable} from "mobx";
import axios, { AxiosInstance } from "axios";
import { UserState } from "./user";

export class RootState {
  user: UserState;
  transportLayer: AxiosInstance;

  constructor() {
    makeAutoObservable(this);

    this.transportLayer = axios.create({
      baseURL: process.env.API_URL
    });

    this.user = new UserState(this, this.transportLayer);
  }
}