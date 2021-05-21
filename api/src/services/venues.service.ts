import HttpException from '@exceptions/HttpException';
import venueModel from '@models/venues.model';
import { isEmpty } from '@utils/util';
import { Venue } from '@/interfaces/venues.interface';
import { CreateVenueDto, DeleteVenueDto, UpdateVenueDto } from '@dtos/venues.dto';

class VenueService {
  public venues = venueModel;

  public async findVenuesForUser(userId: string): Promise<Venue[]> {
    const venues: Venue[] = await this.venues.find({ owner: userId });
    return venues;
  }

  public async createVenue(userId: string, venueData: CreateVenueDto): Promise<Venue> {
    if (isEmpty(venueData)) throw new HttpException(400, "You're not venueData");

    const active = true;

    const createVenueData: Venue = await this.venues.create({
      ...venueData,
      owner: userId,
      active,
    });

    return createVenueData;
  }

  public async updateVenue(userId: string, venueData: UpdateVenueDto): Promise<Venue> {
    if (isEmpty(venueData)) throw new HttpException(400, "You're not venueData");

    const findVenue: Venue = await this.venues.findById(venueData._id);

    if (!findVenue) throw new HttpException(404, `This venue does not exist`);

    if (findVenue.owner != userId)
      throw new HttpException(409, `This venue does not belong to you`);

    const updateVenueById: Venue = await this.venues.findByIdAndUpdate(venueData._id, {
      ...venueData,
    });

    return updateVenueById;
  }

  public async deleteVenue(userId: string, venueData: DeleteVenueDto): Promise<Venue> {
    if (isEmpty(venueData)) throw new HttpException(400, "You're not venueData");

    const findVenue: Venue = await this.venues.findById(venueData._id);

    if (!findVenue || !findVenue.active)
      throw new HttpException(404, `This venue does not exist`);

    if (findVenue.owner != userId)
      throw new HttpException(409, `This venue does not belong to you`);

    const updateVenueById: Venue = await this.venues.findByIdAndUpdate(venueData._id, {
      active: false,
    });

    return updateVenueById;
  }
}

export default VenueService;
