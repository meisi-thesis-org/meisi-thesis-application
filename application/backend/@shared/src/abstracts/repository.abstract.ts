export abstract class Repository<T, K> {
  public abstract findBulk (): Promise<T[]>;
  public abstract findOne (uuid: K): Promise<T>;
  public abstract createOne (entity: T): Promise<void>;
  public abstract updateOne (uuid: K, entity: T): Promise<void>;
}
