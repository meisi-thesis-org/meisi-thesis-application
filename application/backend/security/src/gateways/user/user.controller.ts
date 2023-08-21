import { FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { UserService } from './user.service';
import { type Request, type Response } from 'express';

export class UserController {
  private readonly service: UserService

  public constructor () {
    this.service = new UserService();
  }

  public async findUserByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findUserByUuidRequest = new FindUserByUuidRequest(request.params.uuid);
      const foundUser = await this.service.findUserByUuid(findUserByUuidRequest);
      return response.status(200).json(foundUser);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  public async updateUserByUuid (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async signUp (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async signIn (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async signOut (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }
}
