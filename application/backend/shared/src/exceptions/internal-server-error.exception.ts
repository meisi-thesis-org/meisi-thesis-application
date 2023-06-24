import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { HttpMessageCollection } from '../collections/http-message.collection';

export class InternalServerErrorException extends Exception {
  public constructor() {
    super(
      HttpCodeCollection.INTERNAL_SERVER_ERROR,
      HttpMessageCollection.INTERNAL_SERVER_ERROR
    );
  }
}
