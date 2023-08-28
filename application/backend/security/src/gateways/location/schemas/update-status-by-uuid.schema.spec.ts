import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateStatusByUuidSchema } from './update-status-by-uuid.schema';

describe('UpdateStatusByUuidSchema', () => {
  const updateStatusByUuidSchemaProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      enabled: true
    }
  }

  it('should equal the updateStatusByUuidSchemaProps as the schema is correct', () => {
    expect(UpdateStatusByUuidSchema.parse(updateStatusByUuidSchemaProps)).toEqual(updateStatusByUuidSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateStatusByUuidSchema.parse({})).toThrow();
  })
})
