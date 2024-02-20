import {
  type Response,
  type Request
} from 'express'
import { type UpdateBookByUuidRequest, type CreateBookRequest, type FindBookByUuidRequest, type FindBooksByQueryRequest } from './structs/book.request';
import { BookService } from './book.service';

export class BookController {
  private readonly service: BookService = new BookService();

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
      const book = await this.service.createBook(createBookRequest, { authorization: request.headers.authorization! });
      return response.status(201).json(book);
    } catch (error: any) {
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
      return response.status(error.getHttpCode()).json()
    }
  }
}
