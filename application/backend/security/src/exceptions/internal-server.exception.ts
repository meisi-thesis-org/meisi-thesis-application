import { Exception } from '../abstracts/exception';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { HttpMessageCollection } from '../collections/http-message.collection';

export class InternalServerException extends Exception {
  public constructor() {
    super(
      HttpCodeCollection.INTERNAL_SERVER_EXCEPTION,
      HttpMessageCollection.INTERNAL_SERVER_EXCEPTION
    );
  }
}
