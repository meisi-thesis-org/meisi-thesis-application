import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { ForbiddenException } from '../../../src/exceptions/forbidden.exception';

describe('ForbiddenException', () => {
  const conflictException = new ForbiddenException();

  it('should contain status code', () => {
    expect(conflictException.httpCode).toEqual(HttpCodeCollection.FORBIDDEN);
  })

  it('should contain message', () => {
    expect(conflictException.message).toEqual('Forbidden Exception!');
  })
})
