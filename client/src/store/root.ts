import { makeAutoObservable } from "mobx";
import { UserStore } from "./user";
import { AuthStore } from "./auth";

export class RootStore {
  user: UserStore;
  auth: AuthStore;

  constructor() {
    makeAutoObservable(this);

    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
  }
}
