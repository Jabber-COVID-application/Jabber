export interface Stats {
  cases: number;
  deaths: number;
  tests: number;
}

export interface StatsByState {
  [state: string]: Stats;
}

export interface GetStatsResponse {
  nationalStats: Stats;
  statsByState: StatsByState;
}
