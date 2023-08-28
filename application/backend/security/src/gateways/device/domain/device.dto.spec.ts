import { describe, expect, it } from 'vitest';
import { DeviceDTO } from './device.dto';

describe('DeviceDTO', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyIpAddress = 'dummyIpAddress';
  const dummyPlatform = 'dummyPlatform';
  const dummyModel = 'dummyModel';
  const dummyEnabled = true;
  const dummyActivated = true;
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new DeviceDTO(
    dummyUuid,
    dummyUserUuid,
    dummyIpAddress,
    dummyPlatform,
    dummyModel,
    dummyEnabled,
    dummyActivated,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have an instanceOf DeviceDTO', () => {
    expect(instance).toBeInstanceOf(DeviceDTO);
  })
})
