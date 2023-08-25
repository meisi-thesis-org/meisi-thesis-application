import { describe, expect, it } from 'vitest';
import { UpdateLocationRequest } from './update-location.request';

describe('UpdateLocationRequest', () => {
  const instance = new UpdateLocationRequest(
    'dummyUuid',
    'dummyUserUuid',
    'dummyCoordinateX',
    'dummyCoordinateY'
  );

  it('should have an instanceOf of UpdateLocationRequest', () => {
    expect(instance).toBeInstanceOf(UpdateLocationRequest);
  })
})
