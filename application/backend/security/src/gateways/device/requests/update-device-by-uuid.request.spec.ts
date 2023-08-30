import { describe, expect, it } from 'vitest';
import { UpdateDeviceByUuidRequest } from './update-device-by-uuid.request';

describe('UpdateDeviceByUuidRequest', () => {
  const instance = new UpdateDeviceByUuidRequest(
    'dummyUuid',
    'dummyIpAddress',
    'dummyPlatform',
    'dummyModel'
  )

  it('should have an instanceOf of UpdateDeviceByUuidRequest', () => {
    expect(instance).toBeInstanceOf(UpdateDeviceByUuidRequest);
  })
})
