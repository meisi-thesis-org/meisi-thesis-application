export abstract class Gateway<T> {
  protected constructor(
    protected readonly _router: T
  ) {}

  public abstract subscribe(): T
}
