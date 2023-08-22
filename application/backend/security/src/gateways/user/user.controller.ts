import { FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { SignUpRequest } from './requests/sign-up.request';
import { UserService } from './user.service';
import { type Request, type Response } from 'express';

export class UserController {
  private readonly service: UserService;

  public constructor () {
    this.service = new UserService();
  }

  public async findUserByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findUserByUuidRequest = new FindUserByUuidRequest(request.params.uuid);
      const foundUser = await this.service.findUserByUuid(findUserByUuidRequest);
      return response.status(200).json(foundUser);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async signUp (request: Request, response: Response): Promise<Response> {
    try {
      const signUpRequest = new SignUpRequest(
        request.body.username,
        request.body.email,
        request.body.phoneNumber
      );
      const createdUser = await this.service.signUp(signUpRequest);
      return response.status(201).json(createdUser);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async signIn (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async signOut (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }
}
