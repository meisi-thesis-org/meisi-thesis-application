import { Exception } from '../abstracts/exception.abstract';
import * as HttpCode from './../types/http-code.type'

export class NonFoundException extends Exception {
  public constructor () {
    super(HttpCode.Collection.NON_FOUND_EXCEPTION)
  }
}
