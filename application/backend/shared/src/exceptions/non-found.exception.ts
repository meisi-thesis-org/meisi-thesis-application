import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { HttpMessageCollection } from '../collections/http-message.collection';

export class NonFoundException extends Exception {
  public constructor() {
    super(
      HttpCodeCollection.NON_FOUND,
      HttpMessageCollection.NON_FOUND
    );
  }
}
