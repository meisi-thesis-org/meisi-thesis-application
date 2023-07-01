export abstract class Repository<K> {
  public abstract findBulk(): Promise<K[]>
  public abstract save(entity: K): Promise<K | null | undefined>
}
