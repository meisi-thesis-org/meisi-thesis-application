export abstract class Repository<T, K> {
  abstract fetchBulk(): Promise<T[]>
  abstract fetchOneByUuid(uuid: K): Promise<T | undefined>
  abstract save(data: T): Promise<T>
}
