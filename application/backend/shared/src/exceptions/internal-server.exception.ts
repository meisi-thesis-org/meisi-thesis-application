import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';

export class InternalServerException extends Exception {
  public constructor() {
    super(HttpCodeCollection.INTERNAL_SERVER_ERROR, 'InternalServer Exception!')
  }
}
