import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { BadRequestException } from '../../../src/exceptions/bad-request.exception'

describe('BadRequestException', () => {
  const badRequestException = new BadRequestException();

  it('should contain status code', () => {
    expect(badRequestException.httpCode).toEqual(HttpCodeCollection.BAD_REQUEST);
  })
  it('should contain message', () => {
    expect(badRequestException.message).toEqual('BadRequest Exception!');
  })
})
