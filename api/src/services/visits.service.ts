import HttpException from '@exceptions/HttpException';
import visitModel from '@models/visits.model';
import venueModel from '@models/venues.model';
import { isEmpty } from '@utils/util';
import { Venue } from '@/interfaces/venues.interface';
import { Visit } from '@/interfaces/visits.interface';

/**
 * TODO - Handle Implied Check out (24 hrs?)
 *      - Handle Multiple Venue Check ins (shouldn't be allowed)
 */

class VisitsService {
  public visits = visitModel;
  public venues = venueModel;

  public async getCurrentVisit(userId: string, venueId: string): Promise<Visit> {
    const venue: Venue = await this.venues.findById(venueId);

    if (!venue) throw new HttpException(404, 'Venue not found');

    const visit: Visit = await this.visits
      .findOne({ user: userId, venue: venueId })
      .sort({ checkin: -1 });

    if (!visit || visit.checkout) throw new HttpException(404, 'No current visit found');

    return visit;
  }

  public async checkIn(userId: string, venueId: string): Promise<Visit> {
    const venue: Venue = await this.venues.findById(venueId);

    if (!venue) throw new HttpException(404, 'Venue not found');

    const existingVisit: Visit = await this.visits
      .findOne({ user: userId, venue: venueId })
      .sort({ checkin: -1 });

    if (existingVisit && !existingVisit.checkout)
      throw new HttpException(409, 'Already checked in to venue');

    const visit: Visit = await this.visits.create({
      user: userId,
      venue: venueId,
      checkin: new Date(),
    });

    return visit;
  }

  public async checkOut(userId: string, venueId: string): Promise<Visit> {
    const venue: Venue = await this.venues.findById(venueId);

    if (!venue) throw new HttpException(404, 'Venue not found');

    const existingVisit: Visit = await this.visits
      .findOne({ user: userId, venue: venueId })
      .sort({ checkin: -1 });

    if (existingVisit && existingVisit.checkout)
      throw new HttpException(409, 'Visit not found');

    const visit: Visit = await this.visits.findByIdAndUpdate(
      existingVisit._id,
      {
        checkout: new Date(),
      },
      {
        returnOriginal: false,
      },
    );

    return visit;
  }
}

export default VisitsService;
