import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateCoordinatesByUuidSchema } from './update-coordinates-by-uuid.schema';

describe('UpdateCoordinatesByUuidSchema', () => {
  const findLocationByUuidProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      coordinatesX: '0.50',
      coordinatesY: '0.50'
    }
  }

  it('should equal the findLocationByUuidProps as the schema is correct', () => {
    expect(UpdateCoordinatesByUuidSchema.parse(findLocationByUuidProps)).toEqual(findLocationByUuidProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateCoordinatesByUuidSchema.parse({})).toThrow();
  })
})
