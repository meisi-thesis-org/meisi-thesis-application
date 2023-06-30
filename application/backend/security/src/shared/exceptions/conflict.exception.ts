import { Exception } from '../abstracts/exception';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class ConflictException extends Exception {
  public constructor() {
    super(HttpCodeCollection.CONFLICT);
  }
}
