import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { HttpMessageCollection } from '../collections/http-message.collection';

export class UnauthorizedException extends Exception {
  public constructor() {
    super(
      HttpCodeCollection.UNAUTHORIZED,
      HttpMessageCollection.UNAUTHORIZED
    );
  }
}
