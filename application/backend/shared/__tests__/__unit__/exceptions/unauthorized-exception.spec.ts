import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { UnauthorizedException } from '../../../src/exceptions/unauthorized.exception';

describe('UnauthorizedException', () => {
  const notFoundException = new UnauthorizedException();

  it('should contain status code', () => {
    expect(notFoundException.httpCode).toEqual(HttpCodeCollection.UNAUTHORIZED);
  })

  it('should contain message', () => {
    expect(notFoundException.message).toEqual('Unauthorized Exception!');
  })
})
