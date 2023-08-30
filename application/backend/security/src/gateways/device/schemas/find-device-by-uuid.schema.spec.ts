import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { FindDeviceByUuidSchema } from './find-device-by-uuid.schema';

describe('FindDeviceByUuidSchema', () => {
  const findDeviceByUuidSchemaProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    }
  }

  it('should equal the findDeviceByUuidSchema as the schema is correct', () => {
    expect(FindDeviceByUuidSchema.parse(findDeviceByUuidSchemaProps)).toEqual(findDeviceByUuidSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => FindDeviceByUuidSchema.parse({})).toThrow();
  })
})
