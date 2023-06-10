import { HttpCodeCollection } from '../../../src/collections/http-code.collection';
import { ConflictException } from '../../../src/exceptions/conflict.exception';

describe('ConflictException', () => {
  const conflictException = new ConflictException();

  it('should contain status code', () => {
    expect(conflictException.httpCode).toEqual(HttpCodeCollection.CONFLICT);
  })

  it('should contain message', () => {
    expect(conflictException.message).toEqual('Conflict Exception!');
  })
})
