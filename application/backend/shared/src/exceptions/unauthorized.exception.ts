import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class UnauthorizedException extends Exception {
  public constructor() {
    super(HttpCodeCollection.UNAUTHORIZED, 'Unauthorized Exception!')
  }
}
