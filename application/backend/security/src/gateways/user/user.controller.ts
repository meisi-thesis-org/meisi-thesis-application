import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { SignUpRequest } from './requests/sign-up.request';
import { HttpCodeCollection } from '../../collections/http-code.collection';

export class UserController {
  private readonly userService = new UserService();

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

      const user = await this.userService.signUp(signUpRequest);

      return response.status(HttpCodeCollection.CREATED).json(user);
    } catch (exception: any) {
      return response.status(exception.httpCode).json(exception.httpMessage);
    }
  }
}
