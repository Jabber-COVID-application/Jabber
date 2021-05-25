import { NextFunction, Response } from 'express';
import { User } from '@interfaces/users.interface';
import VenuesService from '@services/venues.service';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Venue } from '@/interfaces/venues.interface';
import { CreateVenueDto, DeleteVenueDto, UpdateVenueDto } from '@dtos/venues.dto';

class VenuesController {
  public venueService = new VenuesService();

  public getVenue = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const venueId = req.params.venueId;

    try {
      const findVenue: Venue = await this.venueService.findVenue(venueId);

      res.status(200).json({ data: findVenue, message: 'findVenue' });
    } catch (error) {
      next(error);
    }
  };

  public getVenues = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const findAllUsersData: Venue[] = await this.venueService.findVenuesForUser(
        userData._id,
      );

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createVenue = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData: User = req.user;
      const venueData: CreateVenueDto = req.body;
      const createVenueData: Venue = await this.venueService.createVenue(
        userData._id,
        venueData,
      );

      res.status(201).json({ data: createVenueData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateVenue = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData: User = req.user;
      const venueData: UpdateVenueDto = req.body;
      const updateVenueData: Venue = await this.venueService.updateVenue(
        userData._id,
        venueData,
      );

      res.status(200).json({ data: updateVenueData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteVenue = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData: User = req.user;
      const venueData: DeleteVenueDto = req.body;
      const deleteVenueData: Venue = await this.venueService.deleteVenue(
        userData._id,
        venueData,
      );

      res.status(200).json({ data: deleteVenueData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VenuesController;
