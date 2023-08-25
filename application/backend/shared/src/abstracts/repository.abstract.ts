export abstract class Repository<K, V> {
  abstract findBulk (): Promise<V[]>;
  abstract findOneByUuid (uuid: K): Promise<V | undefined>;
  abstract createOne (entity: V): Promise<void>;
}
