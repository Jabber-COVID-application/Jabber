import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import StatsController from '@/controllers/stats.controller';

class StatsRoute implements Route {
  public path = '/stats';
  public router = Router();
  public statsController = new StatsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('', this.statsController.getStats);
  }
}

export default StatsRoute;
