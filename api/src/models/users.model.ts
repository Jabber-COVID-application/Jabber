import { model, Schema, Document } from 'mongoose';
import { User, UserType } from '@interfaces/users.interface';

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
 *  store
 *
 * medical (protected, optional)
 *  conditions[]
 *  medications[]
 *
 */

const userDetails: Schema = new Schema({
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
});

const userAddress: Schema = new Schema({
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
});

const userSchema: Schema = new Schema({
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
    type: userDetails,
    required: false,
  },
  address: {
    type: userAddress,
    required: false,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
