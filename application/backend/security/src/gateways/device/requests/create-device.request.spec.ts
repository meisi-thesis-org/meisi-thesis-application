import { describe, expect, it } from 'vitest';
import { CreateDeviceRequest } from './create-device.request';

describe('CreateDeviceRequest', () => {
  const instance = new CreateDeviceRequest(
    'dummyUserUuid',
    'dummyIpAddress',
    'dummyPlatform',
    'dummyModel'
  )

  it('should have an instanceOf of CreateDeviceRequest', () => {
    expect(instance).toBeInstanceOf(CreateDeviceRequest);
  })
})
