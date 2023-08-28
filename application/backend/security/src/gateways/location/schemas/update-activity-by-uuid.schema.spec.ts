import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateActivityByUuidSchema } from './update-activity-by-uuid.schema';

describe('UpdateActivityByUuidSchema', () => {
  const updateActivityByUuidSchemaProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      activated: true
    }
  }

  it('should equal the updateActivityByUuidSchemaProps as the schema is correct', () => {
    expect(UpdateActivityByUuidSchema.parse(updateActivityByUuidSchemaProps)).toEqual(updateActivityByUuidSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateActivityByUuidSchema.parse({})).toThrow();
  })
})
