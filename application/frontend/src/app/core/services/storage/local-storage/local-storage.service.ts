import { Injectable } from '@angular/core';
import { Storage } from '../storage.abstract';
import { type StorageCollection } from '../../../../shared/collections/storage.collection';

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends Storage {
  public override getItem<T>(name: StorageCollection): T | null {
    const data = localStorage.getItem(name);

    return data !== null ? JSON.parse(data) : null;
  }

  public override setItem<T>(name: StorageCollection, data: T): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  public override removeItem(name: StorageCollection): void {
    localStorage.removeItem(name)
  }

  public override clear(): void {
    localStorage.clear()
  }
}
