import { Exception } from '../abstracts/exception';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class NonFoundException extends Exception {
  public constructor() {
    super(HttpCodeCollection.NON_FOUND);
  }
}
