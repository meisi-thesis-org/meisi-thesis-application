import { HttpCodeCollection } from '../../../../src/shared/collections/http-code.collection';
import { ConflictException } from '../../../../src/shared/exceptions/conflict.exception';

describe('ConflictException', () => {
  const exception = new ConflictException();

  it('should have 409 httpCode', () => {
    expect(exception.getHttpCode()).toBe(HttpCodeCollection.CONFLICT)
  })
})
