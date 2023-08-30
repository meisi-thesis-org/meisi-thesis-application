import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { FindDevicesSchema } from './find-devices.schema';

describe('FindDevicesSchema', () => {
  const findDevicesSchemaProps = {
    query: {
      userUuid: new RandomProvider().randomUUID(),
      ipAddress: 'ipAddress',
      platform: 'platform',
      model: 'model'
    }
  }

  it('should equal the findDevicesSchema as the schema is correct', () => {
    expect(FindDevicesSchema.parse(findDevicesSchemaProps)).toEqual(findDevicesSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => FindDevicesSchema.parse({})).toThrow();
  })
})
