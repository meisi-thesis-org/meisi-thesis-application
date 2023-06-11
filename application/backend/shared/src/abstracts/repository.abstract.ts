export abstract class Repository<T, K> {
  public abstract findOneByUuid(uuid: K): Promise<T | undefined | null>;
  public abstract findBulk(): Promise<T[]>;
  public abstract create(data: T): Promise<void>;
};
