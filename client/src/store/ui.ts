import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";
import axiosInstance from "../transport";

export class UIStore {
  root: RootStore;
  isLoading: boolean;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
    this.isLoading = true;
  }
}
