export interface Stats {
  cases: number;
  deaths: number;
  tests: number;
}

export interface StatsByState {
  [state: string]: Stats;
}
