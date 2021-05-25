import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import VenuesController from '@/controllers/venues.controller';
import {
  CreateVenueValidator,
  DeleteVenueValidator,
  GetVenueValidator,
  UpdateVenueValidator,
} from '@dtos/venues.dto';
import authMiddleware from '@middlewares/auth.middleware';
import permissionsMiddleware from '@middlewares/permissions.middleware';
import { UserType } from '@interfaces/users.interface';

class VenuesRoute implements Route {
  public path = '/venues';
  public router = Router();
  public venuesController = new VenuesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/:venueId',
      authMiddleware,
      validationMiddleware(GetVenueValidator, 'params'),
      this.venuesController.getVenue,
    );
    this.router.get(
      '',
      authMiddleware,
      permissionsMiddleware([UserType.VENUE_ADMIN, UserType.SUPER_ADMIN]),
      this.venuesController.getVenues,
    );
    this.router.post(
      '',
      authMiddleware,
      permissionsMiddleware([UserType.VENUE_ADMIN, UserType.SUPER_ADMIN]),
      validationMiddleware(CreateVenueValidator, 'body'),
      this.venuesController.createVenue,
    );
    this.router.put(
      '/:id',
      authMiddleware,
      permissionsMiddleware([UserType.VENUE_ADMIN, UserType.SUPER_ADMIN]),
      validationMiddleware(UpdateVenueValidator, 'body'),
      this.venuesController.updateVenue,
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      permissionsMiddleware([UserType.VENUE_ADMIN, UserType.SUPER_ADMIN]),
      validationMiddleware(DeleteVenueValidator, 'body'),
      this.venuesController.deleteVenue,
    );
  }
}

export default VenuesRoute;
