import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { HttpCodeCollection } from '../../../../shared/src/collections/http-code.collection';
import { SignUpRequest } from './requests/sign-up.request';

export class UserController {
  private readonly _service: UserService = new UserService();

  public async fetchUser(request: Request, response: Response): Promise<Response> {
    try {
      const userDTO = await this._service.fetchUser(request.params.uuid!)

      return response.status(HttpCodeCollection.OK).json(userDTO);
    } catch ({ httpCode, message }: any) {
      return response.status(httpCode).json(message);
    }
  }

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

      const userDTO = await this._service.signUp(signUpRequest)

      return response.status(HttpCodeCollection.CREATED).json(userDTO);
    } catch ({ httpCode, message }: any) {
      return response.status(httpCode).json(message);
    }
  }
}
