import { sign, decode, verify, type JwtPayload } from 'jsonwebtoken';

export class RandomTokenProvider {
  public sign(payload: string | object | Buffer, secret: string, expiresIn: string): string {
    return sign(payload, secret, { expiresIn });
  }

  public decode(token: string): string | JwtPayload | null {
    return decode(token);
  }

  public verify(token: string, secret: string): string | JwtPayload {
    return verify(token, secret);
  }
}
