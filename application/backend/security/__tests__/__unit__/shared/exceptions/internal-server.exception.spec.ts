import { HttpCodeCollection } from '../../../../src/shared/collections/http-code.collection';
import { InternalServerException } from '../../../../src/shared/exceptions/internal-server.exception'

describe('InternalServerException', () => {
  const exception = new InternalServerException();

  it('should have 500 httpCode', () => {
    expect(exception.getHttpCode()).toBe(HttpCodeCollection.INTERNAL_SERVER_ERROR)
  })
})
