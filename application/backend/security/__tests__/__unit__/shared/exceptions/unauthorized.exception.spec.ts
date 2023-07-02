import { HttpCodeCollection } from '../../../../src/shared/collections/http-code.collection';
import { UnauthorizedException } from '../../../../src/shared/exceptions/unauthorized.exception';

describe('UnauthorizedException', () => {
  const exception = new UnauthorizedException();

  it('should have 401 httpCode', () => {
    expect(exception.getHttpCode()).toBe(HttpCodeCollection.UNAUTHORIZED)
  })
})
