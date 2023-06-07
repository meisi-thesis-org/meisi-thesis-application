import { type Request, type Response } from 'express';
import { type UserDTO } from './domain/user.dto';
import { UserService } from './user.service';
import { SecurityConfiguration } from '../../security.configuration';
import { HttpStatusCode } from '../../../../shared/src/collections/http-status-code.collection';
import { SignUpRequest } from './requests/sign-up.request';
import { SignInRequest } from './requests/sign-in.request';
import { RefreshCodeRequest } from './requests/refresh-code.request';
import { UserMockRepository } from './repositories/user-mock.repository';

export class UserController {
  private readonly _service: UserService = new UserService(
    new UserMockRepository()
  );

  public async fetchUser(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.fetchUser(request.params.uuid);

      return response.status(HttpStatusCode.OK).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async signUp(request: Request, response: Response): Promise<Response> {
    try {
      const signUpRequest: SignUpRequest = new SignUpRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber,
        request.body.firstName,
        request.body.lastName,
        request.body.dateBirth
      );

      const userDTO: UserDTO = await this._service.signUp(signUpRequest);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    try {
      const signInRequest: SignInRequest = new SignInRequest(
        request.body.accessCode
      );

      const userDTO: UserDTO = await this._service.signIn(signInRequest);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async signOut(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.signOut(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async refreshCode(request: Request, response: Response): Promise<Response> {
    try {
      const refreshCodeRequest: RefreshCodeRequest = new RefreshCodeRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber
      );

      const userDTO: UserDTO = await this._service.refreshCode(refreshCodeRequest);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async refreshToken(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.refreshToken(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async block(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.block(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async unblock(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.unblock(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async deactivate(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.deactivate(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async activate(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.activate(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async acceptPrivacyTerms(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.acceptPrivacyTerms(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }

  public async refusePrivacyTerms(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO: UserDTO = await this._service.refusePrivacyTerms(request.user.uuid);

      return response.status(HttpStatusCode.CREATED).json(userDTO)
    } catch (exception: unknown) {
      const { status, message } = SecurityConfiguration.instance.exceptionHandler.handle(exception);

      return response.status(status).json(message)
    }
  }
}
