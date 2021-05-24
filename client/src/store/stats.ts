import { makeAutoObservable } from "mobx";
import { RootStore } from "./root";
import axiosInstance from "../transport";

interface Stats {
  cases: number;
  deaths: number;
  tests: number;
}

interface StatsByState {
  [state: string]: Stats;
}

export class StatsStore {
  root: RootStore;
  nationalStats?: Stats;
  statsByState?: StatsByState;

  constructor(root: RootStore) {
    makeAutoObservable(this);

    this.root = root;
  }

  /**
   * API Endpoint Produces Inaccurate Data (At least to google), so consider parsing Wikipedia Data using WikiJS
   */
  populate() {
    axiosInstance.get("/stats").then(({ status, data }) => {
      if (status === 200) {
        this.nationalStats = data.data.nationalStats;
        this.statsByState = data.data.statsByState;
      }
    });
  }
}
