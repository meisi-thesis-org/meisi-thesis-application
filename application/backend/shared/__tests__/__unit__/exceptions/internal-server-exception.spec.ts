import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { InternalServerException } from '../../../src/exceptions/internal-server.exception';

describe('InternalServerException', () => {
  const internalServerException = new InternalServerException();

  it('should contain status code', () => {
    expect(internalServerException.httpCode).toEqual(HttpCodeCollection.INTERNAL_SERVER_ERROR);
  })

  it('should contain message', () => {
    expect(internalServerException.message).toEqual('InternalServer Exception!');
  })
})
