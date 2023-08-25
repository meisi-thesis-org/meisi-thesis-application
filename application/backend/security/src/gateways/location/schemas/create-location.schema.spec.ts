import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { CreateLocationSchema } from './create-location.schema';

describe('CreateLocationSchema', () => {
  const createLocationProps = {
    body: {
      userUuid: new RandomProvider().randomUUID(),
      coordinateX: 'dummyCoordinateX',
      coordinateY: 'dummyCoordinateY'
    }
  }

  it('should equal the createLocationSchema as the schema is correct', () => {
    expect(CreateLocationSchema.parse(createLocationProps)).toEqual(createLocationProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => CreateLocationSchema.parse({})).toThrow();
  })
})
