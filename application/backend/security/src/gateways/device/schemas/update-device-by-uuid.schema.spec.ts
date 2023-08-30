import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateDeviceByUuidSchema } from './update-device-by-uuid.schema';

describe('UpdateDeviceByUuidSchema', () => {
  const updateDeviceByUuidSchemaProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      ipAddress: 'dummyIpAddress',
      platform: 'dummyPlatform',
      model: 'dummyModel'
    }
  }

  it('should equal the updateDeviceByUuidSchema as the schema is correct', () => {
    expect(UpdateDeviceByUuidSchema.parse(updateDeviceByUuidSchemaProps)).toEqual(updateDeviceByUuidSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateDeviceByUuidSchema.parse({})).toThrow();
  })
})
