import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { sessionMapper, type SessionDTO, type SessionEntity } from './domain/session.entity';
import { type SignOutRequest, type SignInRequest, type RefreshTokensRequest } from './domain/session.request';
import { RedisProvider } from './providers/redis.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { HashProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/hash.provider';
import { TokenProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/token.provider';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';

export class GatewayService {
  private readonly redisProvider = new RedisProvider();
  private readonly hashToken = new HashProvider();
  private readonly tokenProvider = new TokenProvider();

  public async signIn (signInRequest: SignInRequest): Promise<SessionDTO> {
    try {
      await this.redisProvider.connect();
      await this.redisProvider.clear();

      const userSessionExists = await this.redisProvider
        .keyExists(`userSession::${signInRequest.userUuid}`)
        .catch(() => {
          throw new InternalServerException()
        })

      if (userSessionExists === 1) throw new ConflictException();

      const accessToken = this.tokenProvider.sign({ userUuid: signInRequest.userUuid }, '1h', process.env.ACCESS_TOKEN_SECRET);
      const refreshToken = this.tokenProvider.sign({ userUuid: signInRequest.userUuid }, '1d', process.env.REFRESH_TOKEN_SECRET);

      const sessionEntity: SessionEntity = {
        userUuid: signInRequest.userUuid,
        hashedAccessToken: await this.hashToken.hash(accessToken),
        hashedRefreshToken: await this.hashToken.hash(refreshToken)
      };

      await this.redisProvider.addMap(`userSession::${signInRequest.userUuid}`, sessionEntity)

      sessionEntity.hashedAccessToken = accessToken;
      sessionEntity.hashedRefreshToken = refreshToken;

      await this.redisProvider.disconnect()

      return sessionMapper(sessionEntity);
    } catch (error) {
      await this.redisProvider.disconnect();
      throw error;
    }
  }

  public async signOut (signOutRequest: SignOutRequest): Promise<SessionDTO> {
    try {
      await this.redisProvider.connect().catch(() => {
        throw new InternalServerException();
      })

      const userSessionExists = await this.redisProvider
        .keyExists(`userSession::${signOutRequest.userUuid}`)
        .catch(() => {
          throw new InternalServerException()
        })

      if (userSessionExists !== 1) throw new NonFoundException();

      const sessionEntity: SessionEntity = {
        userUuid: signOutRequest.userUuid,
        hashedAccessToken: '',
        hashedRefreshToken: ''
      };

      await this.redisProvider.removeByKey(`userSession::${signOutRequest.userUuid}`)

      await this.redisProvider.disconnect()

      return sessionMapper(sessionEntity);
    } catch (error) {
      await this.redisProvider.disconnect();
      throw error;
    }
  }

  public async refreshTokens (refreshTokensRequest: RefreshTokensRequest): Promise<SessionDTO> {
    try {
      await this.redisProvider.connect().catch(() => {
        throw new InternalServerException();
      })

      const userSessionExists = await this.redisProvider
        .keyExists(`userSession::${refreshTokensRequest.userUuid}`)
        .catch(() => {
          throw new InternalServerException()
        })

      if (userSessionExists !== 1) throw new NonFoundException();

      const accessToken = this.tokenProvider.sign({ userUuid: refreshTokensRequest.userUuid }, '1h', process.env.ACCESS_TOKEN_SECRET);
      const refreshToken = this.tokenProvider.sign({ userUuid: refreshTokensRequest.userUuid }, '1d', process.env.REFRESH_TOKEN_SECRET);

      const sessionEntity: SessionEntity = {
        userUuid: refreshTokensRequest.userUuid,
        hashedAccessToken: await this.hashToken.hash(accessToken),
        hashedRefreshToken: await this.hashToken.hash(refreshToken)
      };

      await this.redisProvider.addMap(`userSession::${refreshTokensRequest.userUuid}`, sessionEntity)

      sessionEntity.hashedAccessToken = accessToken;
      sessionEntity.hashedRefreshToken = refreshToken;
      await this.redisProvider.disconnect()

      return sessionMapper(sessionEntity);
    } catch (error) {
      await this.redisProvider.disconnect();
      throw error;
    }
  }
}
