import { model, Schema, Document } from 'mongoose';
import { RolloutPhase, User, UserType } from '@interfaces/users.interface';
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
 * rolloutDetails
 *  age (already have)
 *  phaseOneA
 *    frontLineWorker
 *    agedCareDisabilityWorker
 *    agedCareDisabilityResident
 *  phaseOneB
 *    highRiskWorker
 *    careWorker
 *    disability
 *    medicalCondition
 *    closeContact
 *    essentialTravel
 *  phase2a
 *    aboriginalOrTorresStrait
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

const VaccineCertificationSchema: Schema = new Schema(
  {
    certifier: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

const RolloutDetailsSchema: Schema = new Schema(
  {
    phase: {
      type: RolloutPhase,
      required: false,
    },
    frontLineWorker: {
      type: Boolean,
      required: true,
    },
    agedCareDisabilityWorker: {
      type: Boolean,
      required: true,
    },
    agedCareDisabilityResident: {
      type: Boolean,
      required: true,
    },
    highRiskWorker: {
      type: Boolean,
      required: true,
    },
    careWorker: {
      type: Boolean,
      required: true,
    },
    disability: {
      type: Boolean,
      required: true,
    },
    medicalCondition: {
      type: Boolean,
      required: true,
    },
    closeContact: {
      type: Boolean,
      required: true,
    },
    essentialTravel: {
      type: Boolean,
      required: true,
    },
    aboriginalOrTorresStrait: {
      type: Boolean,
      required: true,
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
    immutable: true,
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
  rolloutDetails: {
    type: RolloutDetailsSchema,
    required: false,
  },
  vaccineCertification: {
    type: VaccineCertificationSchema,
    required: false,
  },
});

const User = model<User & Document>('User', UserSchema);

export default User;
