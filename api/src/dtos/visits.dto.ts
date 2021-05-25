import * as Joi from '@hapi/joi';
import 'joi-extract-type';

export const VisitValidator = Joi.object({
  venue: Joi.string().required(),
});

export type VisitDto = Joi.extractType<typeof VisitValidator>;
