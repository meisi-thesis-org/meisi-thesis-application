import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { HttpCodeCollection } from '../../shared/collections/http-code.collection';

export class UserController {
  private readonly service: UserService = new UserService();

  public async signUp(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(HttpCodeCollection.CREATED);
    } catch (error) {
      return response.status(HttpCodeCollection.INTERNAL_SERVER_ERROR);
    }
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(HttpCodeCollection.CREATED);
    } catch (error) {
      return response.status(HttpCodeCollection.INTERNAL_SERVER_ERROR);
    }
  }

  public async signOut(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(HttpCodeCollection.CREATED);
    } catch (error) {
      return response.status(HttpCodeCollection.INTERNAL_SERVER_ERROR);
    }
  }

  public async refreshAccessCode(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(HttpCodeCollection.CREATED);
    } catch (error) {
      return response.status(HttpCodeCollection.INTERNAL_SERVER_ERROR);
    }
  }

  public async refreshTokens(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(HttpCodeCollection.CREATED);
    } catch (error) {
      return response.status(HttpCodeCollection.INTERNAL_SERVER_ERROR);
    }
  }
}
