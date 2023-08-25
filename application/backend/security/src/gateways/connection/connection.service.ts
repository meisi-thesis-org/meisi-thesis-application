import { type ConnectionDTO } from './domain/connection.dto';
import { type RefreshTokensRequest } from './requests/refresh-tokens.request';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { ConnectionMapper } from './domain/connection.mapper';
import { ConnectionStateRepository } from './repositories/connection-state.repository';
import { type ConnectionRepository } from './connection.repository';
import { HashProvider } from '@meisi-thesis/application-backend-shared/src/providers/hash.provider';
import { TokenProvider } from './providers/token.provider';

export class ConnectionService {
  private readonly repository: ConnectionRepository;
  private readonly mapper: ConnectionMapper;
  private readonly hashProvider: HashProvider;
  private readonly tokenProvider: TokenProvider;

  public constructor () {
    this.repository = new ConnectionStateRepository();
    this.mapper = new ConnectionMapper();
    this.hashProvider = new HashProvider();
    this.tokenProvider = new TokenProvider();
  }

  public async refreshTokens (
    refreshTokenRequest: RefreshTokensRequest
  ): Promise<ConnectionDTO> {
    const connection = await this.repository
      .findOneByUuid(refreshTokenRequest.getUuid())
      .catch(() => {
        throw new InternalServerException()
      });

    if (connection === undefined) throw new NonFoundException();

    const payload = {
      username: refreshTokenRequest.getUsername(),
      uuid: refreshTokenRequest.getUuid(),
      email: refreshTokenRequest.getEmail(),
      phoneNumber: refreshTokenRequest.getPhoneNumber()
    }

    const accessToken = this.tokenProvider.sign(payload, process.env.ACCESS_TOKEN_SECRET, '1h');
    const refreshToken = this.tokenProvider.sign(payload, process.env.REFRESH_TOKEN_SECRET, '1d');

    const hashedAccessToken = await this.hashProvider.hash(accessToken);
    const refreshAccessToken = await this.hashProvider.hash(refreshToken);

    await this.repository
      .updateRefreshTokens(connection.getUuid(), { accessToken: hashedAccessToken, refreshToken: refreshAccessToken })
      .catch(() => {
        throw new InternalServerException()
      });

    connection.setAccessToken(accessToken);
    connection.setRefreshToken(refreshToken);

    return this.mapper.map(connection);
  }
}
