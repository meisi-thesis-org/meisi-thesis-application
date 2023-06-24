import { Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { HttpMessageCollection } from '../collections/http-message.collection';

export class BadRequestException extends Exception {
  public constructor() {
    super(
      HttpCodeCollection.BAD_REQUEST,
      HttpMessageCollection.BAD_REQUEST
    );
  }
}
