import bcrypt from 'bcrypt';
import { HttpCodeCollection } from '../../../../../shared/src/collections/http-code.collection';

export class EncoderProvider {
  public async compare(
    rawValue: string | Buffer,
    encryptedValue: string
  ): Promise<boolean> {
    return await bcrypt.compare(rawValue, encryptedValue).catch(() => {
      throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR }
    });
  }

  public async hash(rawValue: string): Promise<string> {
    return await bcrypt.hash(rawValue, 10).catch(() => {
      throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR }
    });
  }
}
