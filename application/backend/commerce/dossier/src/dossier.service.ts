import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type DossierRepository } from './dossier.repository';
import { type DossierEntity, type DossierDTO, dossierMapper } from './structs/dossier.domain';
import {
  type UpdateDossierByUuidRequest,
  type CreateDossierRequest,
  type FindDossierByUserUuidRequest,
  type FindDossierByUuidRequest
} from './structs/dossier.request';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { DossierStateRepository } from './repositories/dossier-state.repository';

export class DossierService {
  private readonly repository: DossierRepository = new DossierStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findDossierByUuid (
    findDossierByUuidRequest: FindDossierByUuidRequest
  ): Promise<DossierDTO> {
    const foundDossier = await this.repository
      .findDossierByUuid(findDossierByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundDossier === undefined) throw new NonFoundException();

    return dossierMapper(foundDossier);
  }

  public async findDossierByUserUuid (
    findDossierByUserUuidRequest: FindDossierByUserUuidRequest
  ): Promise<DossierDTO> {
    const foundDossier = await this.repository
      .findDossierByUserUuid(findDossierByUserUuidRequest.userUuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundDossier === undefined) throw new NonFoundException();

    return dossierMapper(foundDossier);
  }

  public async createDossier (
    createDossierRequest: CreateDossierRequest,
    createDosserOptions?: Record<string, string>
  ): Promise<DossierDTO> {
    const foundDossier = await this.repository
      .findDossierByUserUuid(createDossierRequest.userUuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundDossier !== undefined) throw new ConflictException();

    await this.networkProvider.doHttpRequest(
      '8000',
      `security/users/${createDossierRequest.userUuid}`,
      'GET',
      { authorization: createDosserOptions?.authorization ?? '' }
    )

    const createdDossier: DossierEntity = {
      uuid: this.randomProvider.randomUUID(),
      userUuid: createDossierRequest.userUuid,
      designation: createDossierRequest.designation,
      price: createDossierRequest.price,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await this.repository
      .createDossier(createdDossier)
      .catch(() => { throw new InternalServerException(); })

    return dossierMapper(createdDossier)
  }

  public async updateDossierByUuid (
    updateDossierByUuidRequest: UpdateDossierByUuidRequest
  ): Promise<DossierDTO> {
    const foundDossier = await this.repository
      .findDossierByUuid(updateDossierByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException(); })

    if (foundDossier === undefined) throw new NonFoundException();

    const toUpdateDossier: Omit<DossierEntity, 'uuid' | 'userUuid' | 'createdAt'> = {
      designation: updateDossierByUuidRequest.designation ?? foundDossier.designation,
      price: updateDossierByUuidRequest.price ?? foundDossier.price,
      visible: updateDossierByUuidRequest.visible ?? foundDossier.visible,
      active: updateDossierByUuidRequest.active ?? foundDossier.active,
      updatedAt: new Date().toISOString()
    }

    const updatedDossier = await this.repository
      .updateDossierByUuid(updateDossierByUuidRequest.uuid, toUpdateDossier)
      .catch(() => { throw new InternalServerException(); })

    if (updatedDossier === undefined) throw new NonFoundException();

    return dossierMapper(updatedDossier);
  }
}
