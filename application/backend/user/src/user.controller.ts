import { type Request, type Response } from 'express';
import { SignUpRequest } from './requests/sign-up.request';
import { SignInRequest } from './requests/sign-in.request';
import { RecoverAccessCodeRequest } from './requests/recover-access-code.request';
import { UserService } from './user.service';

export class UserController {
  private readonly service: UserService = new UserService();

  public async signUp (request: Request, response: Response): Promise<Response> {
    try {
      const { username, email, phoneNumber } = request.body;
      const signUpRequest = new SignUpRequest(username, email, phoneNumber)
      const user = await this.service.signUp(signUpRequest);
      return response.status(201).json(user);
    } catch (error: any) {
      // TODO: Cross Cutting Service ( LoggerService )
      return response.status(error.httpCode);
    }
  }

  public async signIn (request: Request, response: Response): Promise<Response> {
    try {
      const { accessCode } = request.body;
      const signInRequest = new SignInRequest(accessCode)
      const user = await this.service.signIn(signInRequest);
      return response.status(201).json(user);
    } catch (error: any) {
      // TODO: Cross Cutting Service ( LoggerService )
      return response.status(error.httpCode);
    }
  }

  public async recoverAccessCode (request: Request, response: Response): Promise<Response> {
    try {
      const { username, email, phoneNumber } = request.body;
      const recoverAccessCodeRequest = new RecoverAccessCodeRequest(username, email, phoneNumber);
      const user = await this.service.recoverAccessCode(recoverAccessCodeRequest);
      return response.status(201).json(user);
    } catch (error: any) {
      // TODO: Cross Cutting Service ( LoggerService )
      return response.status(error.httpCode);
    }
  }
}
