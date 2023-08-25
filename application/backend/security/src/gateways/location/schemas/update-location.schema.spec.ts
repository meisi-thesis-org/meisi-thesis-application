import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateLocationSchema } from './update-location.schema';

describe('UpdateLocationSchema', () => {
  const updateLocationProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      userUuid: new RandomProvider().randomUUID(),
      coordinateX: 'dummyCoordinateX',
      coordinateY: 'dummyCoordinateY'
    }
  }

  it('should equal the UpdateLocationSchema as the schema is correct', () => {
    expect(UpdateLocationSchema.parse(updateLocationProps)).toEqual(updateLocationProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateLocationSchema.parse({})).toThrow();
  })
})
