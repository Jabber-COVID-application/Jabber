import * as Joi from '@hapi/joi';
import 'joi-extract-type';

export const LoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const SignupValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
});

export type LoginDto = Joi.extractType<typeof LoginValidator>;
export type SignupDto = Joi.extractType<typeof SignupValidator>;
