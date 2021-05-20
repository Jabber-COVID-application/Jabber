import { makeAutoObservable } from "mobx";
import { UserStore } from "./user";
import { AuthStore } from "./auth";
import { StatsStore } from "./stats";

export class RootStore {
  user: UserStore;
  auth: AuthStore;
  stats: StatsStore;

  constructor() {
    makeAutoObservable(this);

    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.stats = new StatsStore(this);
  }
}
