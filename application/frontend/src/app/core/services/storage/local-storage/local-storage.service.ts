import { Injectable } from '@angular/core';
import { Storage } from '../storage.abstract';
import { type StorageCollection } from '../storage.collection';

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends Storage {
  public override fetch<T>(key: StorageCollection): T {
    const data = localStorage.getItem(key);

    return data === null ? null : JSON.parse(data);
  }

  public override save<T>(key: StorageCollection, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public override delete(name: StorageCollection): void {
    localStorage.removeItem(name);
  }

  public override clear(): void {
    localStorage.clear()
  }
}
