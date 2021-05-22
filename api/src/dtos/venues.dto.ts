import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { AddressDto } from '@dtos/misc.dto';

export const CreateVenueValidator = Joi.object({
  name: Joi.string().required(),
  address: AddressDto.required(),
});

export const UpdateVenueValidator = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  address: AddressDto.required(),
});

export const DeleteVenueValidator = Joi.object({
  _id: Joi.string().required(),
});

export type CreateVenueDto = Joi.extractType<typeof CreateVenueValidator>;
export type UpdateVenueDto = Joi.extractType<typeof UpdateVenueValidator>;
export type DeleteVenueDto = Joi.extractType<typeof DeleteVenueValidator>;
