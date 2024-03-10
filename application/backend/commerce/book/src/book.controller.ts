import {
  type Response,
  type Request
} from 'express'
import { type UpdateBookByUuidRequest, type CreateBookRequest, type FindBookByUuidRequest, type FindBooksByQueryRequest } from './structs/book.request';
import { BookService } from './book.service';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';

export class BookController {
  private readonly service: BookService = new BookService();
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  private async sendExceptionQueue (routeURL: string, exception: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({
        routeURL,
        correlationUuid: this.randomProvider.randomUUID(),
        exception
      }))
    ).catch(() => { throw new InternalServerException() });
  }

  public async findBooksByQuery (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findBooksByQueryRequest: FindBooksByQueryRequest = {
        dossierUuid: String(request.query.dossierUuid) ?? ''
      }
      const bookCollection = await this.service.findBooksByQuery(findBooksByQueryRequest);
      return response.status(200).json(bookCollection);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.books::findBooksByQuery', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findBookByUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findBookByUuidRequest: FindBookByUuidRequest = {
        uuid: request.params.uuid
      }
      const book = await this.service.findBookByUuid(findBookByUuidRequest);
      return response.status(200).json(book);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.books::findBookByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createBook (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const createBookRequest: CreateBookRequest = {
        dossierUuid: request.body.dossierUuid,
        designation: request.body.designation,
        description: request.body.description,
        price: request.body.price
      }
      const book = await this.service.createBook(createBookRequest, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(book);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.books::createBook', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateBookByUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const updateBookByUuidRequest: UpdateBookByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        description: request.body.description,
        price: request.body.price,
        visible: request.body.visible,
        active: request.body.active
      }
      const book = await this.service.updateBookByUuid(updateBookByUuidRequest);
      return response.status(201).json(book);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.books::updateBookByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
