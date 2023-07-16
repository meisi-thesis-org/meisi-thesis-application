export abstract class Storage {
  public abstract fetch<T>(name: string): T;
  public abstract save<T>(name: string, data: T): void;
  public abstract delete(name: string): void;
  public abstract clear(): void;
}
