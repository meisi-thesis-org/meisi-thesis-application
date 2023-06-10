import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class ConflictException extends Exception {
  public constructor() {
    super(HttpCodeCollection.CONFLICT, 'Conflict Exception!')
  }
}
