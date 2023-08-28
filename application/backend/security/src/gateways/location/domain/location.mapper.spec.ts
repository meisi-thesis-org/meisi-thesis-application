import { describe, expect, it } from 'vitest';
import { LocationEntity } from './location.entity';
import { LocationDTO } from './location.dto';
import { LocationMapper } from './location.mapper';

describe('LocationMapper', () => {
  const instance = new LocationMapper();

  it('should have an instanceOf LocationMapper', () => {
    expect(instance).instanceOf(LocationMapper);
  })

  describe('map', () => {
    const dummyUuid = 'dummyUuid';
    const dummyUserUuid = 'dummyUserUuid';
    const dummyCoordinateX = 'dummyCoordinateX';
    const dummyCoordinateY = 'dummyCoordinateY';
    const dummyEnabled = true;
    const dummyActivated = true;
    const dummyCreatedAt = new Date().toISOString();
    const dummyUpdatedAt = new Date().toISOString();

    const locationEntity = new LocationEntity(
      dummyUuid,
      dummyUserUuid,
      dummyCoordinateX,
      dummyCoordinateY,
      dummyEnabled,
      dummyActivated,
      dummyCreatedAt,
      dummyUpdatedAt
    );

    expect(instance.map(locationEntity)).toBeInstanceOf(LocationDTO)
  })
})
