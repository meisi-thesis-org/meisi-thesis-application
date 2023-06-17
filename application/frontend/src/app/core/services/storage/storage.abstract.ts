import { type StorageCollection } from './storage.collection';

export abstract class Storage {
  public abstract fetch<T>(key: StorageCollection): T;
  public abstract save<T>(key: StorageCollection, value: T): void;
  public abstract delete(key: StorageCollection): void;
  public abstract clear(): void;
}
