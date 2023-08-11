import { type Request, type Response } from 'express';
import { HttpCode } from '../../shared/collections/http-code.collection';
import { UserService } from './user.service';
import { SignUpRequest } from './requests/sign-up.request';
import { SignInRequest } from './requests/sign-in.request';
import { RecoverAccessCodeRequest } from './requests/recover-access-code.request';

export class UserController {
  private readonly service: UserService;

  public constructor() {
    this.service = new UserService();
  }

  public async signUp(request: Request, response: Response): Promise<Response> {
    try {
      const signUpRequest = new SignUpRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber
      );
      const user = await this.service.signUp(signUpRequest);
      return response.status(HttpCode.CREATED).json(user);
    } catch (error: any) {
      return response.status(error.code).json(error.message);
    }
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    try {
      const signInRequest = new SignInRequest(request.body.accessCode);
      const user = await this.service.signIn(signInRequest);
      return response.status(HttpCode.CREATED).json(user);
    } catch (error: any) {
      return response.status(error.code).json(error.message);
    }
  }

  public async recoverAccessCode(request: Request, response: Response): Promise<Response> {
    try {
      const recoverAccessCodeRequest = new RecoverAccessCodeRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber
      );
      const user = await this.service.recoverAccessCode(recoverAccessCodeRequest);
      return response.status(HttpCode.CREATED).json(user);
    } catch (error: any) {
      return response.status(error.code).json(error.message);
    }
  }
}
