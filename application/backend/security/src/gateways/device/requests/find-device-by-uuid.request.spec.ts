import { describe, expect, it } from 'vitest';
import { FindDeviceByUuidRequest } from './find-device-by-uuid.request';

describe('FindDeviceByUuidRequest', () => {
  const instance = new FindDeviceByUuidRequest(
    'dummyUuid'
  )

  it('should have an instanceOf of FindDeviceByUuidRequest', () => {
    expect(instance).toBeInstanceOf(FindDeviceByUuidRequest);
  })
})
