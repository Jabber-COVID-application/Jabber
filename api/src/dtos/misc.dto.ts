import * as Joi from '@hapi/joi';

export const AddressDto = Joi.object({
  formatted: Joi.string().required(),
  placeId: Joi.string().required(),
});
