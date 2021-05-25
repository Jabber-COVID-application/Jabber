import { NextFunction, Response } from 'express';
import { User } from '@interfaces/users.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import VisitsService from '@/services/visits.service';
import { Visit } from '@/interfaces/visits.interface';

class VisitsController {
  public visitService = new VisitsService();

  public getCurrentVisit = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId: string = req.user._id;
      const venueId: string = req.params.venue;

      const currentVisit: Visit = await this.visitService.getCurrentVisit(
        userId,
        venueId,
      );

      res.status(200).json({ data: currentVisit, message: 'getCurrentVisit' });
    } catch (error) {
      next(error);
    }
  };

  public checkIn = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const venueId: string = req.params.venue;

      const visit: Visit = await this.visitService.checkIn(userId, venueId);

      res.status(201).json({ data: visit, message: 'checkIn' });
    } catch (error) {
      next(error);
    }
  };

  public checkOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user._id;
      const venueId: string = req.params.venue;

      const visit: Visit = await this.visitService.checkOut(userId, venueId);

      res.status(200).json({ data: visit, message: 'checkOut' });
    } catch (error) {
      next(error);
    }
  };
}

export default VisitsController;
