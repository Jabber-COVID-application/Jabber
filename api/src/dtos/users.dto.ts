import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { AddressDto } from '@dtos/misc.dto';

const UserDetailsValidator = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
});

const RolloutDetailsValidator = Joi.object({
  phase: Joi.string(),
  frontLineWorker: Joi.boolean().required(),
  agedCareDisabilityWorker: Joi.boolean().required(),
  agedCareDisabilityResident: Joi.boolean().required(),
  highRiskWorker: Joi.boolean().required(),
  careWorker: Joi.boolean().required(),
  disability: Joi.boolean().required(),
  medicalCondition: Joi.boolean().required(),
  closeContact: Joi.boolean().required(),
  essentialTravel: Joi.boolean().required(),
  aboriginalOrTorresStrait: Joi.boolean().required(),
});

export const CreateUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  type: Joi.string().required(),
  userDetails: UserDetailsValidator,
  userAddress: AddressDto,
  rolloutDetails: RolloutDetailsValidator,
});

export const UpdateUserValidator = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
  type: Joi.string(),
  userDetails: UserDetailsValidator,
  userAddress: AddressDto,
  rolloutDetails: RolloutDetailsValidator,
});

export type CreateUserDto = Joi.extractType<typeof CreateUserValidator>;
export type UpdateUserDto = Joi.extractType<typeof UpdateUserValidator>;
