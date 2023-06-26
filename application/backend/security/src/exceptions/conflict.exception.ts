import { Exception } from '../abstracts/exception';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { HttpMessageCollection } from '../collections/http-message.collection';

export class ConflictException extends Exception {
  public constructor() {
    super(
      HttpCodeCollection.CONFLICT_EXCEPTION,
      HttpMessageCollection.CONFLICT_EXCEPTION
    );
  }
}
