import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { HttpCodeCollection } from '../../../../shared/src/collections/http-code.collection';
import { SignUpRequest } from './requests/sign-up.request';
import { type ExceptionHandler } from '../../../../shared/src/handlers/exception.handler';
import { SecurityConfiguration } from '../../security.configuration';
import { SignInRequest } from './requests/sign-in.request';

export class UserController {
  private readonly _service: UserService = new UserService();
  private readonly _exceptionHandler: ExceptionHandler = SecurityConfiguration.instance.exceptionHandler;

  public async signUp(request: Request, response: Response): Promise<Response> {
    try {
      const signUpRequest = new SignUpRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber,
        request.body.firstName,
        request.body.lastName,
        request.body.dateBirth
      );

      const userDTO = await this._service.signUp(signUpRequest).catch(() => {
        throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR };
      });

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch ({ status, message }: any) {
      return response.status(this._exceptionHandler.handle(status).httpCode).json(message);
    }
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    try {
      const signInRequest = new SignInRequest(
        request.body.accessCode
      );

      const userDTO = await this._service.signIn(signInRequest).catch(() => {
        throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR };
      });

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch ({ status, message }: any) {
      return response.status(this._exceptionHandler.handle(status).httpCode).json(message);
    }
  }
}
