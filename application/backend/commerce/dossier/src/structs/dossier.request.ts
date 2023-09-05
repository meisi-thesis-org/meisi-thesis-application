import { type DossierEntity } from './dossier.domain';

type FindDossierByUserUuidRequest = Readonly<Pick<DossierEntity, 'userUuid'>>
type FindDossierByUuidRequest = Readonly<Pick<DossierEntity, 'uuid'>>
type CreateDossierRequest = Readonly<Pick<DossierEntity, 'userUuid' | 'designation'>>
type UpdateDossierByUuidRequest =
    Readonly<Pick<DossierEntity, 'uuid'>> &
    Partial<Readonly<Pick<DossierEntity, 'designation' | 'visible' | 'active'>>>

export type {
  FindDossierByUserUuidRequest,
  FindDossierByUuidRequest,
  CreateDossierRequest,
  UpdateDossierByUuidRequest
}
