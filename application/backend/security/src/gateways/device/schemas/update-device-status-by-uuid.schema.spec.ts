import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateDeviceStatusByUuidSchema } from './update-device-status-by-uuid.schema';

describe('UpdateDeviceStatusByUuidSchema', () => {
  const updateDeviceStatusByUuidSchemaProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      enabled: true
    }
  }

  it('should equal the updateDeviceStatusByUuidSchema as the schema is correct', () => {
    expect(UpdateDeviceStatusByUuidSchema.parse(updateDeviceStatusByUuidSchemaProps)).toEqual(updateDeviceStatusByUuidSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateDeviceStatusByUuidSchema.parse({})).toThrow();
  })
})
