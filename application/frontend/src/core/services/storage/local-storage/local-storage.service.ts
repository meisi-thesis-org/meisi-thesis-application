import { Storage } from '../storage.abstract';

export class LocalStorageService extends Storage {
  public override fetch<T>(name: string): T {
    const data = localStorage.getItem(name);

    return data !== null ? JSON.parse(data) : null;
  }

  public override save<T>(name: string, data: T): void {
    localStorage.setItem(name, JSON.stringify(data));
  }

  public override delete(name: string): void {
    localStorage.removeItem(name);
  }

  public override clear(): void {
    localStorage.clear()
  }
}
