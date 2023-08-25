import { describe, expect, it } from 'vitest';
import { ConnectionDTO } from './connection.dto';
import { ConnectionEntity } from './connection.entity';
import { ConnectionMapper } from './connection.mapper';

describe('ConnectionDTO', () => {
  const instance = new ConnectionMapper();

  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyDeviceUuid = 'dummyDeviceUuid';
  const dummyOwnershipUuid = 'dummyOwnershipUuid';
  const dummyLocationUuid = 'dummyLocationUuid';
  const dummyAccessToken = 'dummyAccessToken';
  const dummyRefreshToken = 'dummyAccessToken';
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const connectionEntity = new ConnectionEntity(
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

  it('should have an instanceOf ConnectionDTO', () => {
    expect(instance.map(connectionEntity)).toBeInstanceOf(ConnectionDTO);
  })
})
