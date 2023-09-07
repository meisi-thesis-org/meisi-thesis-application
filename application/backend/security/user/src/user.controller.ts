import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { type UpdateUserByUuidRequest, type CreateUserRequest, type FindUserByUuidRequest, type UpdateUserAccessCodeRequest, type FindUserByAccessCodeRequest } from './structs/user.request';

export class UserController {
  private readonly userService: UserService = new UserService();

  public async findUserByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findUserByUuidRequest: FindUserByUuidRequest = { uuid: request.params.uuid };
      const user = await this.userService.findUserByUuid(findUserByUuidRequest);
      return response.status(200).json(user)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createUser (request: Request, response: Response): Promise<Response> {
    try {
      const createUserRequest: CreateUserRequest = {
        username: request.body.username,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber
      }
      const user = await this.userService.createUser(createUserRequest);
      return response.status(201).json(user)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateUserByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateUserByUuidRequest: UpdateUserByUuidRequest = {
        uuid: request.params.uuid,
        username: request.body.username,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        dateBirth: request.body.dateBirth
      }
      const user = await this.userService.updateUserByUuid(updateUserByUuidRequest);
      return response.status(201).json(user)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findUserByAccessCode (request: Request, response: Response): Promise<Response> {
    try {
      const findUserByAccessCodeRequest: FindUserByAccessCodeRequest = {
        accessCode: request.params.accessCode
      }
      const user = await this.userService.findUserByAccessCode(findUserByAccessCodeRequest);
      return response.status(200).json(user)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateUserAccessCode (request: Request, response: Response): Promise<Response> {
    try {
      const updateUserByUuidRequest: UpdateUserAccessCodeRequest = {
        username: request.body.username,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber
      }
      const user = await this.userService.updateUserAccessCode(updateUserByUuidRequest);
      return response.status(201).json(user)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}