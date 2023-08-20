import * as bcrypt from 'bcrypt';
import { InternalServerException } from '../exceptions/internal-server.exception';

export class HashProvider {
  private async genSalt (): Promise<string> {
    return await bcrypt.genSalt();
  }

  public async hash (data: string | Buffer): Promise<string> {
    try {
      const genSalt = await this.genSalt();
      return await bcrypt.hash(data, genSalt)
    } catch (error) {
      throw new InternalServerException();
    }
  }
}
