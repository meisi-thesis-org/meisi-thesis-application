import { describe, expect, it } from 'vitest';
import { UpdateDeviceStatusByUuidRequest } from './update-device-status-by-uuid.request';

describe('UpdateDeviceStatusByUuidRequest', () => {
  const instance = new UpdateDeviceStatusByUuidRequest(
    'dummyUuid',
    true
  )

  it('should have an instanceOf of UpdateDeviceStatusByUuidRequest', () => {
    expect(instance).toBeInstanceOf(UpdateDeviceStatusByUuidRequest);
  })
})
