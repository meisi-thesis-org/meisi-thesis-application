export abstract class Repository<T, K> {
  abstract fetchOneByUuid(uuid: K): Promise<T | undefined>
  abstract save(data: T): Promise<T | undefined>
}
