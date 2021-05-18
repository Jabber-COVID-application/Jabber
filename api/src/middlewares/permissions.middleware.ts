import { RequestHandler } from 'express';
import { UserType } from '@interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import HttpException from '@exceptions/HttpException';

/**
 * Middleware for determining user type permissions.
 * @param permissionTypes Array of user types allowed past middleware.
 */
const permissionsMiddleware = (permissionTypes: UserType[]): RequestHandler => {
  return (req: RequestWithUser, res, next) => {
    const userType = req.user.type;

    if (permissionTypes.includes(userType)) {
      next();
    } else {
      next(new HttpException(401, 'User type does not have appropriate permissions'));
    }
  };
};

export default permissionsMiddleware;
