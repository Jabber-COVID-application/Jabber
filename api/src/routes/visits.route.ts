import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { UserType } from '@/interfaces/users.interface';
import permissionsMiddleware from '@/middlewares/permissions.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { VisitValidator } from '@dtos/visits.dto';
import VisitsController from '@/controllers/visits.controller';

class VisitsRoute implements Route {
  public path = '/visits';
  public router = Router();
  public visitsController = new VisitsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/:venue',
      authMiddleware,
      permissionsMiddleware([UserType.GENERAL]),
      validationMiddleware(VisitValidator, 'params'),
      this.visitsController.getCurrentVisit,
    );
    this.router.post(
      '/:venue/checkin',
      authMiddleware,
      permissionsMiddleware([UserType.GENERAL]),
      validationMiddleware(VisitValidator, 'params'),
      this.visitsController.checkIn,
    );
    this.router.post(
      '/:venue/checkout',
      authMiddleware,
      permissionsMiddleware([UserType.GENERAL]),
      validationMiddleware(VisitValidator, 'params'),
      this.visitsController.checkOut,
    );
  }
}

export default VisitsRoute;
