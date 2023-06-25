import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { HttpCodeCollection } from './../../../../shared/src/collections/http-code.collection';
import { SignUpRequest } from './requests/sign-up.request';
import { SignInRequest } from './requests/sign-in.request';
import { type AuthenticatedRequest } from './types/authenticated-request.type';

export class UserController {
  private readonly _service: UserService = new UserService();

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

      const userDTO = await this._service.signUp(signUpRequest);
      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (error: any) {
      return response.status(error.status).json(error);
    }
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    try {
      const signInRequest = new SignInRequest(request.body.accessCode);

      const userDTO = await this._service.signIn(signInRequest);
      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (error: any) {
      return response.status(error.status).json(error);
    }
  }

  public async signOut(request: Request, response: Response): Promise<Response> {
    try {
      const authenticatedRequest: AuthenticatedRequest = request as AuthenticatedRequest;

      const userDTO = await this._service.signOut(authenticatedRequest.user.uuid);
      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (error: any) {
      return response.status(error.status).json(error);
    }
  }

  public async refreshToken(request: Request, response: Response): Promise<Response> {
    try {
      const authenticatedRequest: AuthenticatedRequest = request as AuthenticatedRequest;

      const userDTO = await this._service.refreshTokens(authenticatedRequest.user.uuid);
      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch (error: any) {
      return response.status(error.status).json(error);
    }
  }
}
