import * as Joi from '@hapi/joi';

export const AddressDto = Joi.object({
  address1: Joi.string().required(),
  address2: Joi.string(),
  city: Joi.string().required(),
  postCode: Joi.string().required(),
  state: Joi.string().required(),
});
