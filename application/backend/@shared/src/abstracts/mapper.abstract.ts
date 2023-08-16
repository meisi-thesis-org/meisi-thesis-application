export abstract class Mapper<K, V> {
  public abstract apply (entity: K): V
}
