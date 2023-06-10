export abstract class Repository<T, K> {
  public abstract findById(userEntity: K): T;
  public abstract findBulk(): T;
  public abstract save(data: T): T;
};
