export abstract class Database<T> {
  protected constructor(
    protected readonly dbClient: T
  ) {}

  public abstract onConnect(): T;
  public abstract onClose(): T;
}
