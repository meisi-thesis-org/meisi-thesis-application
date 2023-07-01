import * as jsonwebtoken from 'jsonwebtoken';

export class TokenProvider {
  public static instance: TokenProvider | null = null;

  private constructor() {}

  public static getInstance(): TokenProvider {
    if (this.instance === null) {
      this.instance = new TokenProvider();
    }

    return this.instance;
  }

  public createToken(
    payload: string | object | Buffer,
    tokenSecret: string,
    expiresIn: string
  ): string {
    return jsonwebtoken.sign(payload, tokenSecret, { expiresIn });
  }

  public verifyToken(token: string, tokenSecret: string): string | jsonwebtoken.JwtPayload {
    return jsonwebtoken.verify(token, tokenSecret);
  }
}
