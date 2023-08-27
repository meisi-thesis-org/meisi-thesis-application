import { describe, expect, it } from 'vitest';
import { UpdateCoordinatesByUuidRequest } from './update-coordinates-by-uuid.request';

describe('UpdateCoordinatesByUuidRequest', () => {
  const instance = new UpdateCoordinatesByUuidRequest(
    'dummyUuid',
    'dummyCoordinateX',
    'dummyCoordinateY'
  );

  it('should have an instanceOf of UpdateCoordinatesByUuidRequest', () => {
    expect(instance).toBeInstanceOf(UpdateCoordinatesByUuidRequest);
  })
})
