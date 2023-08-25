import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { type JwtPayload, sign, verify } from 'jsonwebtoken';

export class TokenProvider {
  public sign<T extends string | object | Buffer > (
    payload: T,
    tokenSecret: string | undefined,
    expiresIn: '1h' | '1d'
  ): string {
    try {
      return sign(payload, tokenSecret ?? 'secret', { expiresIn, algorithm: 'RS256' });
    } catch (error) {
      throw new InternalServerException();
    }
  }

  public verify (
    token: string,
    tokenSecret: string
  ): string | JwtPayload {
    try {
      return verify(token, tokenSecret);
    } catch (error) {
      throw new InternalServerException();
    }
  }
}
