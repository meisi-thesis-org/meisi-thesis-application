import bcrypt from 'bcrypt';
import { InternalServerErrorException } from '../../../../../shared/src/exceptions/internal-server-error.exception';

export class EncoderProvider {
  public async compare(
    rawValue: string | Buffer,
    encryptedValue: string
  ): Promise<boolean> {
    return await bcrypt
      .compare(rawValue, encryptedValue)
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }

  public async hash(rawValue: string): Promise<string> {
    return await bcrypt
      .hash(rawValue, 10)
      .catch(() => {
        throw new InternalServerErrorException();
      });
  }
}
