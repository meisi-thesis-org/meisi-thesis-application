export abstract class Repository<T, K> {
  public abstract fetchOneByUuid(uuid: K): Promise<T>;
  public abstract fetchByAuthCredentials(
    username: string,
    email: string,
    phoneNumber: string
  ): Promise<T>;
  public abstract save<V>(data: V): Promise<T>;
}
