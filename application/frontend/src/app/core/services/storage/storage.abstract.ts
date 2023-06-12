import { type StorageCollection } from '../../../shared/collections/storage.collection';

export abstract class Storage {
  public abstract getItem<T>(name: StorageCollection): T | null;
  public abstract setItem<T>(name: StorageCollection, data: T): void;
  public abstract removeItem(name: StorageCollection): void;
  public abstract clear(): void;
}
