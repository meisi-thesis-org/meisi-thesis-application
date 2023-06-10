import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class NotFoundException extends Exception {
  public constructor() {
    super(HttpCodeCollection.NOT_FOUND, 'NotFound Exception!')
  }
}
