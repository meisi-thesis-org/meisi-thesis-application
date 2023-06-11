import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class ForbiddenException extends Exception {
  public constructor() {
    super(HttpCodeCollection.FORBIDDEN, 'Forbidden Exception!')
  }
}
