import { hash, compare } from 'bcrypt';

export class EncoderProvider {
  public async encode (rawValue: string | Buffer, rounds: number): Promise<string> {
    return await hash(rawValue, rounds);
  }

  public async compare (rawValue: string | Buffer, encodedValue: string): Promise<boolean> {
    return await compare(rawValue, encodedValue);
  }
}
