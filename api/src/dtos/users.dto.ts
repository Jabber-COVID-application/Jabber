import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { AddressDto } from '@dtos/misc.dto';

const UserDetailsValidator = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
});

export const CreateUserValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  type: Joi.string().required(),
  userDetails: UserDetailsValidator,
  userAddress: AddressDto,
});

export type CreateUserDto = Joi.extractType<typeof CreateUserValidator>;
