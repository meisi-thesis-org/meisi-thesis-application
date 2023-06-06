import { InternalServerException } from '../exceptions/internal-server.exception';
import { type IException } from '../interface/exception.interface';

export class ExceptionHandler {
  private static _instance: ExceptionHandler | null = null;

  public static get instance(): ExceptionHandler {
    if (this._instance === null) {
      this._instance = new ExceptionHandler();
    }

    return this._instance;
  }

  public handle(exception: unknown): IException {
    switch (exception) {
      default: {
        const { status, message } = new InternalServerException();

        return { status, message };
      }
    }
  }
}
