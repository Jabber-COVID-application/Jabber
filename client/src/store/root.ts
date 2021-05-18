import { makeAutoObservable } from "mobx";
import { UserStore } from "./user";
import { AuthStore } from "./auth";
import { SidebarStore } from "./sidebar";

export class RootStore {
  user: UserStore;
  auth: AuthStore;
  sidebar: SidebarStore;

  constructor() {
    makeAutoObservable(this);

    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.sidebar = new SidebarStore(this);
  }
}
