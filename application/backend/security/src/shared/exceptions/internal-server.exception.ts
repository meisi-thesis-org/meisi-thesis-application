import { Exception } from '../abstracts/exception';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class InternalServerException extends Exception {
  public constructor() {
    super(HttpCodeCollection.INTERNAL_SERVER_ERROR);
  }
}
