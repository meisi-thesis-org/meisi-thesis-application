export abstract class Repository<K, V> {
  abstract findOneByUuid (uuid: K): Promise<V | undefined>;
}
