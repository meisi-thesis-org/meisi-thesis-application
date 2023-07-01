import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { HttpCodeCollection } from '../../shared/collections/http-code.collection';
import { SignUpRequest } from './requests/sign-up.request';
import { SignInRequest } from './requests/sign-in.request';
import { type AuthenticatedRequest } from './types/authenticated-request.type';
import { RefreshAccessCodeRequest } from './requests/refresh-access-code.request';

export class UserController {
  private readonly service: UserService = new UserService();

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

      const userDTO = await this.service.signUp(signUpRequest);

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (exception: any) {
      return response.status(exception.httpCode).json();
    }
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    try {
      const signInRequest = new SignInRequest(
        request.body.accessCode
      );

      const userDTO = await this.service.signIn(signInRequest);

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (exception: any) {
      return response.status(exception.httpCode).json();
    }
  }

  public async signOut(request: Request, response: Response): Promise<Response> {
    try {
      const userUuid = (request as AuthenticatedRequest).user.uuid;

      const userDTO = await this.service.signOut(userUuid);

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (exception: any) {
      return response.status(exception.httpCode).json();
    }
  }

  public async refreshAccessCode(request: Request, response: Response): Promise<Response> {
    try {
      const refreshAccessCode = new RefreshAccessCodeRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber
      );

      const userDTO = await this.service.refreshAccessCode(refreshAccessCode);

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (exception: any) {
      return response.status(exception.httpCode).json();
    }
  }

  public async refreshTokens(request: Request, response: Response): Promise<Response> {
    try {
      const userUuid = (request as AuthenticatedRequest).user.uuid;

      const userDTO = await this.service.refreshTokens(userUuid);

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (exception: any) {
      return response.status(exception.httpCode).json();
    }
  }
}
