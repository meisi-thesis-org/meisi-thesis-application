import { HttpCodeCollection } from '../../../../src/shared/collections/http-code.collection';
import { NonFoundException } from '../../../../src/shared/exceptions/non-found.exception';

describe('NonFoundException', () => {
  const exception = new NonFoundException();

  it('should have 404 httpCode', () => {
    expect(exception.getHttpCode()).toBe(HttpCodeCollection.NON_FOUND)
  })
})
