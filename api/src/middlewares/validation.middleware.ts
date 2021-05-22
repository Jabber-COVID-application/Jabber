import * as Joi from '@hapi/joi';
import { RequestHandler } from 'express';
import HttpException from '@exceptions/HttpException';

const validationMiddleware = (
  schema: Joi.Schema,
  value: string | 'body' | 'query' | 'params' = 'body',
): RequestHandler => {
  return (req, res, next) => {
    (async function () {
      Joi.assert(req[value], schema);
    })()
      .then(() => {
        next();
      })
      .catch(e => {
        next(new HttpException(400, e));
      });
  };
};

export default validationMiddleware;
