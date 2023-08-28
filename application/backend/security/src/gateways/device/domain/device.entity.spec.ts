import { describe, expect, it } from 'vitest';
import { DeviceEntity } from './device.entity';

describe('DeviceEntity', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyIpAddress = 'dummyIpAddress';
  const dummyPlatform = 'dummyPlatform';
  const dummyModel = 'dummyModel';
  const dummyEnabled = true;
  const dummyActivated = true;
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new DeviceEntity(
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

  it('should have an instanceOf DeviceEntity', () => {
    expect(instance).toBeInstanceOf(DeviceEntity);
  })
})
