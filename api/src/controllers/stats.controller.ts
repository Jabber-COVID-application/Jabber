import { NextFunction, Request, Response } from 'express';
import StatsService from '@/services/stats.service';
import { GetStatsDto } from '@dtos/stats.dto';

class StatsController {
  public statsService = new StatsService();

  public getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const statsData: any = await this.statsService.getStats();

      res.status(200).json({ data: statsData, message: 'getStats' });
    } catch (error) {
      next(error);
    }
  };
}

export default StatsController;
