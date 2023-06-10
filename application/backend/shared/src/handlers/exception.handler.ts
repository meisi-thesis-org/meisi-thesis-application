import { type Exception } from '../abstracts/exception.abstract';
import { HttpCodeCollection } from '../collections/http-code.collection';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { InternalServerException } from '../exceptions/internal-server.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

export class ExceptionHandler {
  public handle(httpCode: HttpCodeCollection): Exception {
    switch (httpCode) {
      case HttpCodeCollection.BAD_REQUEST: {
        return new BadRequestException();
      }
      case HttpCodeCollection.NOT_FOUND: {
        return new NotFoundException();
      }
      case HttpCodeCollection.CONFLICT: {
        return new ConflictException();
      }
      default: {
        return new InternalServerException();
      }
    }
  }
}
