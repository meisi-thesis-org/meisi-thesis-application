import { type Request, type Response } from 'express';
import { DossierService } from './dossier.service';
import {
  type UpdateDossierByUuidRequest,
  type CreateDossierRequest,
  type FindDossierByQueryRequest,
  type FindDossierByUuidRequest
} from './structs/dossier.request';

export class DossierController {
  private readonly service: DossierService = new DossierService();

  public async findDossierByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findDossierByUuidRequest: FindDossierByUuidRequest = {
        uuid: request.params.uuid
      }
      const dossier = await this.service.findDossierByUuid(findDossierByUuidRequest);
      return response.status(200).json(dossier);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  async updateDossierByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDossierByUuidRequest: UpdateDossierByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        price: request.body.price,
        visible: request.body.visible,
        active: request.body.active
      }
      const dossier = await this.service.updateDossierByUuid(updateDossierByUuidRequest);
      return response.status(201).json(dossier);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  async createDossier (request: Request, response: Response): Promise<Response> {
    try {
      const createDossierRequest: CreateDossierRequest = {
        userUuid: request.body.userUuid,
        designation: request.body.designation,
        price: request.body.price
      }
      const dossier = await this.service.createDossier(createDossierRequest, { authorization: request.headers.authorization! });
      return response.status(201).json(dossier);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  async findDossiersByQuery (request: Request, response: Response): Promise<Response> {
    try {
      const FindDossierByQueryRequest: FindDossierByQueryRequest = {
        userUuid: String(request.query.userUuid) ?? ''
      }
      const dossiers = await this.service.findDossiersByQuery(FindDossierByQueryRequest);
      return response.status(200).json(dossiers);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}
