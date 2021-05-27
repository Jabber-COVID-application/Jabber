import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserValidator, UpdateUserValidator } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import permissionsMiddleware from '@middlewares/permissions.middleware';
import { UserType } from '@interfaces/users.interface';
import authMiddleware from '@middlewares/auth.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '',
      authMiddleware,
      permissionsMiddleware([UserType.SUPER_ADMIN]),
      this.usersController.getUsers,
    );
    this.router.get(
      '/:id',
      authMiddleware,
      permissionsMiddleware([UserType.SUPER_ADMIN]),
      this.usersController.getUserById,
    );
    this.router.post(
      '',
      authMiddleware,
      permissionsMiddleware([UserType.SUPER_ADMIN]),
      validationMiddleware(CreateUserValidator, 'body'),
      this.usersController.createUser,
    );
    this.router.put(
      '/:id',
      authMiddleware,
      permissionsMiddleware([UserType.SUPER_ADMIN], true),
      validationMiddleware(UpdateUserValidator, 'body'),
      this.usersController.updateUser,
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      permissionsMiddleware([UserType.SUPER_ADMIN]),
      this.usersController.deleteUser,
    );
    this.router.get(
      '/:id/visits',
      authMiddleware,
      permissionsMiddleware([UserType.SUPER_ADMIN], true),
      this.usersController.getUserVisitsById,
    );
  }
}

export default UsersRoute;
