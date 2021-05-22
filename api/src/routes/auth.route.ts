import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { LoginValidator, SignupValidator } from '@dtos/auth.dto';

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/hydrate', authMiddleware, this.authController.hydrate);
    this.router.post(
      '/signup',
      validationMiddleware(SignupValidator, 'body'),
      this.authController.signup,
    );
    this.router.post(
      '/login',
      validationMiddleware(LoginValidator, 'body'),
      this.authController.login,
    );
    this.router.post('/logout', authMiddleware, this.authController.logout);
  }
}

export default AuthRoute;
