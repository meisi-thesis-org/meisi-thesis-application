import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type RedisClientType } from '@redis/client';
import { createClient } from 'redis';

export class RedisProvider {
  private readonly instance: RedisClientType = createClient();

  public async connect (): Promise<void> {
    await this.instance.connect().catch((error) => {
      console.log(error)
      throw new InternalServerException();
    })
  }

  public async keyExists (key: string): Promise<number> {
    return await this.instance.exists(key).catch(() => {
      throw new InternalServerException();
    })
  }

  public async fetchMap (key: string): Promise<Record<string, string>> {
    return await this.instance.hGetAll(key).catch(() => {
      throw new InternalServerException();
    })
  }

  public async addMap (key: string, map: Record<string, string>): Promise<number> {
    return await this.instance.hSet(key, map).catch(() => {
      throw new InternalServerException();
    })
  }

  public async removeByKey (key: string): Promise<number> {
    return await this.instance.del(key)
  }

  public async clear (): Promise<string> {
    return await this.instance.flushDb().catch(() => {
      throw new InternalServerException();
    })
  }

  public async disconnect (): Promise<void> {
    await this.instance.disconnect().catch(() => {
      throw new InternalServerException();
    })
  }

  public isOpen (): boolean {
    return this.instance.isOpen
  }
}
