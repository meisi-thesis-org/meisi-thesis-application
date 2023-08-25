import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { FindLocationByUuidSchema } from './find-location-by-uuid.schema';

describe('FindLocationByUuidSchema', () => {
  const findLocationByUuidProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    }
  }

  it('should equal the findLocationByUuidProps as the schema is correct', () => {
    expect(FindLocationByUuidSchema.parse(findLocationByUuidProps)).toEqual(findLocationByUuidProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => FindLocationByUuidSchema.parse({})).toThrow();
  })
})
