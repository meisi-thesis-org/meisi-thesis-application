import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { BadRequestException } from '../../../src/exceptions/bad-request.exception';
import { ConflictException } from '../../../src/exceptions/conflict.exception';
import { InternalServerException } from '../../../src/exceptions/internal-server.exception';
import { NotFoundException } from '../../../src/exceptions/not-found.exception';
import { ExceptionHandler } from '../../../src/handlers/exception.handler'

describe('ExceptionHandler', () => {
  const exceptionHandler = new ExceptionHandler();

  it('should have BadRequestException', () => {
    expect(exceptionHandler.handle(HttpCodeCollection.BAD_REQUEST)).toBeInstanceOf(BadRequestException)
  })
  it('should have NotFoundException', () => {
    expect(exceptionHandler.handle(HttpCodeCollection.NOT_FOUND)).toBeInstanceOf(NotFoundException)
  })
  it('should have ConflictException', () => {
    expect(exceptionHandler.handle(HttpCodeCollection.CONFLICT)).toBeInstanceOf(ConflictException)
  })
  it('should have InternalServerException', () => {
    expect(exceptionHandler.handle(HttpCodeCollection.INTERNAL_SERVER_ERROR)).toBeInstanceOf(InternalServerException)
  })
})
