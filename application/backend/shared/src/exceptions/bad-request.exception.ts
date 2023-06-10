import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class BadRequestException extends Exception {
  public constructor() {
    super(HttpCodeCollection.BAD_REQUEST, 'BadRequest Exception!')
  }
}
