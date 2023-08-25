import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { NoAuthorizationException } from '@meisi-thesis/application-backend-shared/src/exceptions/no-authorization.exception';
import { type JwtPayload, sign, verify } from 'jsonwebtoken';

export class TokenProvider {
  public sign<T extends string | object | Buffer > (
    payload: T,
    tokenSecret: string | undefined,
    expiresIn: '1h' | '1d'
  ): string {
    try {
      return sign(payload, tokenSecret ?? 'secret', { expiresIn });
    } catch (error) {
      console.log(error)
      throw new InternalServerException();
    }
  }

  public verify (
    token: string,
    tokenSecret: string | undefined
  ): string | JwtPayload {
    try {
      return verify(token, tokenSecret ?? 'secret');
    } catch (error) {
      throw new NoAuthorizationException();
    }
  }
}
