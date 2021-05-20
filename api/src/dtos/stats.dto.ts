import { Stats, StatsByState } from '@interfaces/stats.interface';

export interface GetStatsDto {
  nationalStats: Stats;
  statsByState: StatsByState;
}
