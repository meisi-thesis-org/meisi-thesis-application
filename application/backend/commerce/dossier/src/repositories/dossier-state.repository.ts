import { type DossierRepository } from '../dossier.repository';
import { type DossierEntity } from '../structs/dossier.domain';

export class DossierStateRepository implements DossierRepository {
  private readonly dossierCollection: DossierEntity[] = new Array<DossierEntity>();

  async findDossierByUuid(
    uuid: string
  ): Promise<DossierEntity | undefined> {
    return this.dossierCollection.find((dossierEntity) => dossierEntity.uuid === uuid)
  }

  async findDossierByUserUuid(
    userUuid: string
  ): Promise<DossierEntity | undefined> {
    return this.dossierCollection.find((dossierEntity) => dossierEntity.userUuid === userUuid)
  }

  async createDossier(
    data: DossierEntity
  ): Promise<void> {
    this.dossierCollection.push(data)
  }

  async updateDossierByUuid(
    uuid: string,
    data: Omit<DossierEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<DossierEntity | undefined> {
    for (const dossier of this.dossierCollection) {
      if (dossier.uuid === uuid) {
        dossier.designation = data.designation;
        dossier.price = data.price;
        dossier.visible = data.visible;
        dossier.active = data.active;
        dossier.updatedAt = data.updatedAt;
      }

      return dossier;
    }
  }
}
