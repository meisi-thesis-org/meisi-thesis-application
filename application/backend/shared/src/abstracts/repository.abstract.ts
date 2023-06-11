export abstract class Repository<T, K> {
  public abstract findOneByUuid(uuid: K): Promise<T | undefined | null>
  public abstract findBulk(): Promise<T[]>
  public abstract save(data: T): Promise<void>
};
