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

  async findDossierByUuid (uuid: string): Promise<DossierEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<DossierEntity>({
        name: 'find-dossier-by-uuid',
        text: 'SELECT * FROM dossiers WHERE dossiers.uuid = $1',
        values: [uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findDossiersByQuery (userUuid?: string): Promise<DossierEntity[]> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<DossierEntity>({
        name: 'find-dossiers-by-query',
        text: 'SELECT * FROM dossiers WHERE dossiers.userUuid = $1',
        values: [userUuid]
      });

      if (result.rowCount === 0) {
        const dossiers = await this.provider.query<DossierEntity>({
          name: 'find-dossiers',
          text: 'SELECT * FROM dossiers'
        });

        return dossiers.rows;
      }

      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  async createDossier (data: DossierEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<DossierEntity>({
        name: 'create-dossier',
        text: 'INSERT INTO dossiers ("uuid", "userUuid", "designation", "price", "visible", "active", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [data.uuid, data.userUuid, data.designation, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updateDossierByUuid (
    uuid: string,
    data: Omit<DossierEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<DossierEntity>({
        name: 'update-dossier-by-uuid',
        text: 'UPDATE dossiers SET dossiers.designation = $1, dossiers.price = $2, dossiers.visible = $3, dossiers.active = $4, dossiers.updatedAt = $5 WHERE dossiers.uuid = $6',
        values: [data.designation, data.price, data.visible, data.active, data.updatedAt, uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
