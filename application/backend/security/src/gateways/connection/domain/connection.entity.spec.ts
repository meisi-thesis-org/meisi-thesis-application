import { describe, expect, it } from 'vitest';
import { ConnectionEntity } from './connection.entity';

describe('ConnectionEntity', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyDeviceUuid = 'dummyDeviceUuid';
  const dummyOwnershipUuid = 'dummyOwnershipUuid';
  const dummyLocationUuid = 'dummyLocationUuid';
  const dummyAccessToken = 'dummyAccessToken';
  const dummyRefreshToken = 'dummyAccessToken';
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new ConnectionEntity(
    dummyUuid,
    dummyUserUuid,
    dummyDeviceUuid,
    dummyOwnershipUuid,
    dummyLocationUuid,
    dummyAccessToken,
    dummyRefreshToken,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have an instanceOf ConnectionEntity', () => {
    expect(instance).toBeInstanceOf(ConnectionEntity);
  })

  describe('getUuid', () => {
    it('should equal dummyUuid', () => {
      expect(instance.getUuid()).toEqual(dummyUuid);
    })
  })

  describe('getUserUuid', () => {
    it('should equal dummyUserUuid', () => {
      expect(instance.getUserUuid()).toEqual(dummyUserUuid);
    })
  })

  describe('getDeviceUuid', () => {
    it('should equal dummyDeviceUuid', () => {
      expect(instance.getDeviceUuid()).toEqual(dummyDeviceUuid);
    })
  })

  describe('getOwnershipUuid', () => {
    it('should equal dummyOwnershipUuid', () => {
      expect(instance.getOwnershipUuid()).toEqual(dummyOwnershipUuid);
    })
  })

  describe('getLocationUuid', () => {
    it('should equal dummyLocationUuid', () => {
      expect(instance.getLocationUuid()).toEqual(dummyLocationUuid);
    })
  })

  describe('getAccessToken', () => {
    it('should equal dummyAccessToken', () => {
      expect(instance.getAccessToken()).toEqual(dummyAccessToken);
    })
  })

  describe('getRefreshToken', () => {
    it('should equal dummyRefreshToken', () => {
      expect(instance.getRefreshToken()).toEqual(dummyRefreshToken);
    })
  })

  describe('getCreatedAt', () => {
    it('should equal dummyCreatedAt', () => {
      expect(instance.getCreatedAt()).toEqual(dummyCreatedAt);
    })
  })

  describe('getUpdatedAt', () => {
    it('should equal dummyUpdatedAt', () => {
      expect(instance.getUpdatedAt()).toEqual(dummyUpdatedAt);
    })
  })
})
