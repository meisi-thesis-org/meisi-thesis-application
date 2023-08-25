import { describe, expect, it } from 'vitest';
import { LocationDTO } from './location.dto';

describe('LocationDTO', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyCoordinateX = 'dummyCoordinateX';
  const dummyCoordinateY = 'dummyCoordinateY';
  const dummyEnabled = true;
  const dummyDeactivated = true;
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new LocationDTO(
    dummyUuid,
    dummyUserUuid,
    dummyCoordinateX,
    dummyCoordinateY,
    dummyEnabled,
    dummyDeactivated,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have an instanceOf LocationDTO', () => {
    expect(instance).toBeInstanceOf(LocationDTO);
  })
})
