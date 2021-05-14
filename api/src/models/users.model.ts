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

const location: Schema = new Schema({
  address: {
    type: String,
    unique:true,
    required: true,
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
    type: location,
    required: false,
  },
});

const visitLocation: Schema = new Schema({
  address:{
    type: location,
    unique:true,
    required:true,
  },
  QRCODE:{
    type:String,
    required:true,
  },
  Date:{
    type:Date,
    required:true,
  },
  Checkin:{
    type:Date,
    required:true,
  },
  Checkout:{
    type:Date,
    required:true,
  }
});

const userModel = model<User & Document>('User', userSchema);
const locationModel = model<User & Document>('Location', location);
const visitLocationModel = model<User & Document>('visitLocation', visitLocation);
export default userModel;
