import { describe, expect, it } from 'vitest';
import { LocationEntity } from './location.entity';

describe('LocationEntity', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyCoordinateX = 'dummyCoordinateX';
  const dummyCoordinateY = 'dummyCoordinateY';
  const dummyEnabled = true;
  const dummyDeactivated = true;
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new LocationEntity(
    dummyUuid,
    dummyUserUuid,
    dummyCoordinateX,
    dummyCoordinateY,
    dummyEnabled,
    dummyDeactivated,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have an instanceOf LocationEntity', () => {
    expect(instance).toBeInstanceOf(LocationEntity);
  })
})
