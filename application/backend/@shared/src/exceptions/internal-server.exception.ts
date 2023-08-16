import { Exception } from '../abstracts/exception.abstract';
import * as HttpCode from './../types/http-code.type'

export class InternalServerException extends Exception {
  public constructor () {
    super(HttpCode.Collection.INTERNAL_SERVER_ERROR)
  }
}
