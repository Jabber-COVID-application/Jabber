import { makeAutoObservable } from "mobx";
import { UserStore } from "./user";
import { AuthStore } from "./auth";
import { StatsStore } from "./stats";
import { UIStore } from "./ui";
import { VenueStore } from "./venues";
import { VisitsStore } from "./visits";

export class RootStore {
  ui: UIStore;
  user: UserStore;
  auth: AuthStore;
  stats: StatsStore;
  venues: VenueStore;
  visits: VisitsStore;

  constructor() {
    makeAutoObservable(this);

    this.ui = new UIStore(this);
    this.user = new UserStore(this);
    this.auth = new AuthStore(this);
    this.stats = new StatsStore(this);
    this.venues = new VenueStore(this);
    this.visits = new VisitsStore(this);
  }
}
