export abstract class Mapper<T, K> {
  public abstract map (entity: T): K
}
