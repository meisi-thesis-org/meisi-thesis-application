import { type Request, type Response } from 'express';
import { UserService } from './user.service';
import { type UpdateUserByUuidRequest, type CreateUserRequest, type FindUserByUuidRequest, type UpdateUserAccessCodeRequest, type FindUserByAccessCodeRequest } from './structs/user.request';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';

export class UserController {
  private readonly userService: UserService = new UserService();
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  private async sendExceptionQueue (path: string, error: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({
        routeURL: '/security/users/:userUuid',
        correlationUuid: this.randomProvider.randomUUID(),
        exception: error
      }))
    )
  }

  public async findUserByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findUserByUuidRequest: FindUserByUuidRequest = { uuid: request.params.uuid };
      const user = await this.userService.findUserByUuid(findUserByUuidRequest);
      return response.status(200).json(user)
    } catch (error: any) {
      await this.sendExceptionQueue('security.users::findUserByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createUser (request: Request, response: Response): Promise<Response> {
    try {
      const createUserRequest: CreateUserRequest = {
        username: request.body.username,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        name: request.body.name,
        dateBirth: request.body.dateBirth
      }
      const user = await this.userService.createUser(createUserRequest);
      return response.status(201).json(user)
    } catch (error: any) {
      await this.sendExceptionQueue('security.users::createUser', error);
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
        name: request.body.name,
        dateBirth: request.body.dateBirth !== undefined ? request.body.dateBirth : undefined
      }
      const user = await this.userService.updateUserByUuid(updateUserByUuidRequest);
      return response.status(201).json(user)
    } catch (error: any) {
      await this.sendExceptionQueue('security.users::updateUserByUuid', error);
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
      await this.sendExceptionQueue('security.users::findUserByAccessCode', error);
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
      await this.sendExceptionQueue('security.users::updateUserAccessCode', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
