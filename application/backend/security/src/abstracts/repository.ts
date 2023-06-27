export abstract class Repository<T, K> {
  abstract findBulk(): Promise<T[]>;
  abstract findOneById(id: K): Promise<T>;
  abstract save(data: T): Promise<T>;
  abstract updateOneById(id: K, data: T): Promise<T>;
}
