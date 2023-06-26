export abstract class Repository<T, K> {
  abstract findBulk(): T[];
  abstract findOneById(id: K): T;
  abstract save(data: T): T;
  abstract updateOneById(id: K, data: T): T;
}
