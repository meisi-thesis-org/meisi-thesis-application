import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { FindLocationsSchema } from './find-locations.schema';

describe('FindLocationsSchema', () => {
  const findLocationsSchemaProps = {
    query: {
      userUuid: new RandomProvider().randomUUID()
    }
  }

  it('should equal the findLocationsSchemaProps as the schema is correct', () => {
    expect(FindLocationsSchema.parse(findLocationsSchemaProps)).toEqual(findLocationsSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => FindLocationsSchema.parse({})).toThrow();
  })
})
