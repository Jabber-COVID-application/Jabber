import {AxiosInstance} from "axios";
import { RootState } from "./root";
import {makeAutoObservable} from "mobx";

export class UserState {
  root: RootState;
  transportLayer: AxiosInstance;

  firstName: string = "Michael";
  lastName: string = "Kilbane";
  dateOfBirth: number = NaN;


  constructor(root: RootState, transportLayer: AxiosInstance) {
    makeAutoObservable(this);

    this.root = root;
    this.transportLayer = transportLayer;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set setFirstName(firstName: string) {
    this.firstName = firstName;
  }
}