import { Client } from 'pg';
import { type DossierRepository } from '../dossier.repository';
import { type DossierEntity } from '../structs/dossier.domain';

export class DossierRemoteRepository implements DossierRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  public constructor() {
    this.provider.connect();
  }

  async findDossierByUuid (uuid: string): Promise<DossierEntity | undefined> {
    const result = await this.provider.query<DossierEntity>({
      name: 'find-dossier-by-uuid',
      text: `
        SELECT uuid, user_uuid as "userUuid", price, designation, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM dossiers 
        WHERE dossiers.uuid = $1
      `,
      values: [uuid]
    });
    return result.rows[0];
  }

  async findDossiersByQuery (userUuid?: string): Promise<DossierEntity[]> {
    const result = await this.provider.query<DossierEntity>({
      name: 'find-dossiers-by-query',
      text: `
        SELECT uuid, user_uuid as "userUuid", price, designation, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM dossiers 
        WHERE dossiers.user_uuid = $1
      `,
      values: [userUuid]
    });

    if (result.rowCount === 0) {
      const dossiers = await this.provider.query<DossierEntity>({
        name: 'find-dossiers',
        text: `
          SELECT uuid, user_uuid as "userUuid", price, designation, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
          FROM dossiers
        `
      });

      return dossiers.rows;
    }

    return result.rows;
  }

  async createDossier (data: DossierEntity): Promise<void> {
    await this.provider.query<DossierEntity>({
      name: 'create-dossier',
      text: 'INSERT INTO dossiers ("uuid", "user_uuid", "designation", "price", "visible", "active", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [data.uuid, data.userUuid, data.designation, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
    });
  }

  async updateDossierByUuid (
    uuid: string,
    data: Omit<DossierEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<void> {
    await this.provider.query<DossierEntity>({
      name: 'update-dossier-by-uuid',
      text: 'UPDATE dossiers SET designation = $1, price = $2, visible = $3, active = $4, updated_at = $5 WHERE dossiers.uuid = $6',
      values: [data.designation, data.price, data.visible, data.active, data.updatedAt, uuid]
    });
  }
}
