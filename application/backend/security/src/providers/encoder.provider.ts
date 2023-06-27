import { compare, hash } from 'bcrypt';

export class EncoderProvider {
  public async encode(
    rawValue: string | Buffer
  ): Promise<string> {
    return await hash(rawValue, 10).catch((error) => { throw error });
  }

  public async compareEncoding(
    rawValue: string,
    encodedValue: string
  ): Promise<boolean> {
    return await compare(rawValue, encodedValue).catch((error) => { throw error });
  }
}
