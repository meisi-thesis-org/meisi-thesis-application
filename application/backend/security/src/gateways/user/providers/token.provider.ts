import { sign, verify, type JwtPayload } from 'jsonwebtoken';

export class TokenProvider {
  public sign(
    payload: string | object | Buffer,
    secret: string,
    expiresIn: string
  ): string {
    return sign(payload, secret, { expiresIn });
  }

  public verify(token: string, secret: string): string | JwtPayload {
    return verify(token, secret);
  }
}
