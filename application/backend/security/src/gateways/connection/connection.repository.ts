import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type ConnectionEntity } from './domain/connection.entity';

export interface ConnectionRepository extends Repository<string, ConnectionEntity> {
  updateRefreshTokens(
    uuid: string,
    data: { accessToken: string, refreshToken: string }
  ): Promise<void>
}
