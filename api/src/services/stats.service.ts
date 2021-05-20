import { GetStatsDto } from '@dtos/stats.dto';
import axios from 'axios';
import { Stats, StatsByState } from '@/interfaces/stats.interface';

class StatsService {
  public async getStats(): Promise<GetStatsDto> {
    // Returns inaccurate information, but could not figure out how to use Wikipedia APIs. ¯\_(ツ)_/¯
    return axios
      .request({
        url:
          'https://services1.arcgis.com/vHnIGBHHqDR6y0CR/arcgis/rest/services/Current_Cases_by_State/FeatureServer/0/query?where=1%3D1&outFields=NAME,Cases,Deaths,Tests&returnGeometry=false&f=json',
      })
      .then(({ status, data }) => {
        if (status === 200) {
          const statsByState = data.features.reduce(
            (accumulator: StatsByState, current: any) => {
              const state: Stats = {
                cases: current.attributes.Cases,
                deaths: current.attributes.Deaths,
                tests: current.attributes.Tests,
              };

              accumulator[current.attributes.NAME] = state;

              return accumulator;
            },
            {},
          );

          const nationalStats = Object.values(statsByState).reduce<Stats>(
            (accumulator: Stats, current: Stats) => {
              return {
                cases: accumulator.cases + current.cases,
                deaths: accumulator.deaths + current.deaths,
                tests: accumulator.tests + current.tests,
              };
            },
            {
              cases: 0,
              deaths: 0,
              tests: 0,
            },
          );

          const stats: GetStatsDto = { nationalStats, statsByState };

          return stats;
        }
      })
      .catch(e => {
        console.error(e);
        return {
          nationalStats: {
            cases: 0,
            deaths: 0,
            tests: 0,
          },
          statsByState: {},
        } as GetStatsDto;
      });
  }
}

export default StatsService;
