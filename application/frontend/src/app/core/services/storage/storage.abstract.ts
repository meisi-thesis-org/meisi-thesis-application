export abstract class Storage {
  abstract fetch<T>(name: string): T;
  abstract save<T>(name: string, data: T): void;
  abstract delete(name: string): void;
  abstract clear(): void;
}
