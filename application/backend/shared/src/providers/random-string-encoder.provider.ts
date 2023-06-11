import { hash, compare } from 'bcrypt';

export class RandomStringEncoderProvider {
  public async hash(data: string | Buffer, salts: number): Promise<string> {
    return await hash(data, salts);
  }

  public async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }
}
