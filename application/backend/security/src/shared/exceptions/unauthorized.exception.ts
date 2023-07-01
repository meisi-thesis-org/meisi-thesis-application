import { Exception } from '../abstracts/exception';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class UnauthorizedException extends Exception {
  public constructor() {
    super(HttpCodeCollection.UNAUTHORIZED);
  }
}
