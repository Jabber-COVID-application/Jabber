import { Schema } from 'mongoose';

export const AddressSchema: Schema = new Schema(
  {
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
