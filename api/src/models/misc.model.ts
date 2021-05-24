import { Schema } from 'mongoose';

export const AddressSchema: Schema = new Schema(
  {
    formatted: {
      type: String,
      required: true,
    },
    placeId: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
