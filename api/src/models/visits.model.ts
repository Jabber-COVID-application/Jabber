import { Document, model, Schema } from 'mongoose';
import { Visit } from '@interfaces/visits.interface';

const VisitSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  venue: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  checkin: {
    type: Date,
    required: true,
  },
  checkout: {
    type: Date,
    required: false,
  },
});

VisitSchema.index({ user: 1, venue: 1, checkin: -1 });

const Visit = model<Visit & Document>('Visit', VisitSchema);

export default Visit;
