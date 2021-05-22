import { model, Schema, Document } from 'mongoose';
import { User, UserType } from '@interfaces/users.interface';
import { AddressSchema } from '@models/misc.model';

/* User Data Model
 *
 * email
 * password
 * type
 * active
 *
 * details (optional)
 *  firstName
 *  middleName
 *  lastName
 *  dateOfBirth?
 *
 * address (protected, optional)
 *  address1
 *  address2
 *  city
 *  postCode
 *  state
 *
 * medical (protected, optional)
 *  conditions[]
 *  medications[]
 *
 * visitedLocations[]
 *
 */

const UserDetailsSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

const VisitSchema: Schema = new Schema(
  {
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
  },
  { _id: false },
);

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: UserType,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  userDetails: {
    type: UserDetailsSchema,
    required: false,
  },
  address: {
    type: AddressSchema,
    required: false,
  },
  visits: {
    type: [VisitSchema],
    required: false,
  },
});

const User = model<User & Document>('User', UserSchema);

export default User;
