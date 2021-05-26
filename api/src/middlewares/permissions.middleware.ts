import { Request, RequestHandler } from 'express';
import { UserType } from '@interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import HttpException from '@exceptions/HttpException';

/**
 * Middleware for determining user type permissions.
 * @param permissionTypes Array of user types allowed past middleware.
 * @param allowOwner Allow owner of request subject.
 * @param ownerExtractor Function used to extract owner ID from request.
 */
const permissionsMiddleware = (
  permissionTypes: UserType[],
  allowOwner: boolean = false,
  ownerExtractor: Function = (req: Request) => req.params.id,
): RequestHandler => {
  return (req: RequestWithUser, res, next) => {
    const userId = req.user._id;
    const userType = req.user.type;

    const isOwner = allowOwner && userId == ownerExtractor(req);

    if (permissionTypes.includes(userType) || isOwner) {
      next();
    } else {
      next(new HttpException(401, 'User does not have appropriate permissions'));
    }
  };
};

export default permissionsMiddleware;
