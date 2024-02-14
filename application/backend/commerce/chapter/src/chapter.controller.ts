import {
  type Response,
  type Request
} from 'express'
import { type UpdateChapterByUuidRequest, type CreateChapterRequest, type FindChapterByUuidRequest, type FindChaptersByBookUuidRequest } from './structs/chapter.request';
import { ChapterService } from './chapter.service';

export class ChapterController {
  private readonly service: ChapterService = new ChapterService();

  public async findChaptersByBookUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findChaptersByDossierUuidRequest: FindChaptersByBookUuidRequest = {
        bookUuid: String(request.query.bookUuid)
      }
      const bookCollection = await this.service.findChaptersByBookUuid(findChaptersByDossierUuidRequest);
      return response.status(200).json(bookCollection);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findChapterByUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findChapterByUuidRequest: FindChapterByUuidRequest = {
        uuid: request.params.uuid
      }
      const book = await this.service.findChapterByUuid(findChapterByUuidRequest);
      return response.status(200).json(book);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createChapter (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const createChapterRequest: CreateChapterRequest = {
        bookUuid: request.body.bookUuid,
        designation: request.body.designation,
        description: request.body.description
      }
      const book = await this.service.createChapter(createChapterRequest, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(book);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateChapterByUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const updateChapterByUuidRequest: UpdateChapterByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        description: request.body.description,
        visible: request.body.visible,
        active: request.body.active
      }
      const book = await this.service.updateChapterByUuid(updateChapterByUuidRequest);
      return response.status(201).json(book);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}
