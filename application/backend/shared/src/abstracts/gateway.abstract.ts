export abstract class Gateway<T> {
  public constructor(
    protected readonly _router: T
  ) {}

  public abstract subscribe(): T
}
