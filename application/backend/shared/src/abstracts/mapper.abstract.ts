export abstract class Mapper<K, T> {
  public abstract apply(entity: K): T;
}
