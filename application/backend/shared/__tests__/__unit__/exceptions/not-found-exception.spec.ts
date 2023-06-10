import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { NotFoundException } from '../../../src/exceptions/not-found.exception';

describe('NotFoundException', () => {
  const notFoundException = new NotFoundException();

  it('should contain status code', () => {
    expect(notFoundException.httpCode).toEqual(HttpCodeCollection.NOT_FOUND);
  })

  it('should contain message', () => {
    expect(notFoundException.message).toEqual('NotFound Exception!');
  })
})
