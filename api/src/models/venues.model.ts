import { Document, model, Schema } from 'mongoose';
import { AddressSchema } from '@models/misc.model';
import { Venue } from '@interfaces/venues.interface';

const VenueSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: false,
  },
});

const Venue = model<Venue & Document>('Venue', VenueSchema);

export default Venue;
