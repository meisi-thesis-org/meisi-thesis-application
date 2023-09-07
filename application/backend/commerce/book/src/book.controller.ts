import {
  type Response,
  type Request
} from 'express'
import { type UpdateBookByUuidRequest, type CreateBookRequest, type FindBookByUuidRequest, type FindBooksByDossierUuidRequest } from './structs/book.request';
import { BookService } from './book.service';

export class BookController {
  private readonly service: BookService = new BookService();

  public async findBooksByDossierUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findBooksByDossierUuidRequest: FindBooksByDossierUuidRequest = {
        dossierUuid: String(request.query.dossierUuid)
      }
      const bookCollection = await this.service.findBooksByDossierUuid(findBooksByDossierUuidRequest);
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
        description: request.body.description
      }
      const book = await this.service.createBook(createBookRequest);
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
