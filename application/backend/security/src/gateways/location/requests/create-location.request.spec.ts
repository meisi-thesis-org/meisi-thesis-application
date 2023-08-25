import { describe, expect, it } from 'vitest';
import { CreateLocationRequest } from './create-location.request';

describe('CreateLocationRequest', () => {
  const instance = new CreateLocationRequest(
    'dummyUserUuid',
    'dummyCoordinateX',
    'dummyCoordinateY'
  );

  it('should have an instanceOf of CreateLocationRequest', () => {
    expect(instance).toBeInstanceOf(CreateLocationRequest);
  })
})
