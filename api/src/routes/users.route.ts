import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import permissionsMiddleware from '@middlewares/permissions.middleware';
import { UserType } from '@interfaces/users.interface';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    // this.router.use(authMiddleware);
    // this.router.use(permissionsMiddleware([UserType.SUPER_ADMIN]));
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('', this.usersController.getUsers);
    this.router.get('/:id', this.usersController.getUserById);
    this.router.post('', validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put('/:id', validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete('/:id', this.usersController.deleteUser);
  }
}

export default UsersRoute;
