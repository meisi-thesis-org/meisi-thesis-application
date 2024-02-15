import { type DossierEntity } from './dossier.domain';

type FindDossierByUserUuidRequest = Readonly<Pick<DossierEntity, 'userUuid'>>
type FindDossierByUuidRequest = Readonly<Pick<DossierEntity, 'uuid'>>
type CreateDossierRequest = Readonly<Pick<DossierEntity, 'userUuid' | 'designation' | 'price'>>
type UpdateDossierByUuidRequest =
    Readonly<Pick<DossierEntity, 'uuid'>> &
    Partial<Readonly<Pick<DossierEntity, 'designation' | 'price' | 'visible' | 'active'>>>

export type {
  FindDossierByUserUuidRequest,
  FindDossierByUuidRequest,
  CreateDossierRequest,
  UpdateDossierByUuidRequest
}
