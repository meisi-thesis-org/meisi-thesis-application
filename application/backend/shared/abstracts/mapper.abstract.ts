export abstract class Mapper<T, K> {
  public abstract apply(entity: T): K;
}
