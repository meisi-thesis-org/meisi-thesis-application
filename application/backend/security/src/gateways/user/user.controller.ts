import { UserService } from './user.service';
import { type Request, type Response } from 'express';

export class UserController {
  private readonly service: UserService

  public constructor () {
    this.service = new UserService();
  }

  public async fetchUser (request: Request, response: Response): Promise<Response> {
    throw new Error();
  }

  public async updateUser (request: Request, response: Response): Promise<Response> {
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
