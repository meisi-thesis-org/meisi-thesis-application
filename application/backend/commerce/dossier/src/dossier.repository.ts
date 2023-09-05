import { type DossierEntity } from './structs/dossier.domain';

export interface DossierRepository {
  findDossierByUuid(
    uuid: string
  ): Promise<DossierEntity | undefined>
  findDossierByUserUuid(
    userUuid: string
  ): Promise<DossierEntity | undefined>
  createDossier(
    data: DossierEntity
  ): Promise<void>
  updateDossierByUuid(
    uuid: string,
    data: Omit<DossierEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<DossierEntity | undefined>
}
