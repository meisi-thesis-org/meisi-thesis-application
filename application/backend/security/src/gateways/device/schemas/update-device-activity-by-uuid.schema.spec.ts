import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { UpdateDeviceActivityByUuidSchema } from './update-device-activity-by-uuid.schema';

describe('UpdateDeviceActivityByUuidSchema', () => {
  const updateDeviceActivityByUuidSchemaProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    },
    body: {
      activated: true
    }
  }

  it('should equal the updateDeviceActivityByUuidSchema as the schema is correct', () => {
    expect(UpdateDeviceActivityByUuidSchema.parse(updateDeviceActivityByUuidSchemaProps)).toEqual(updateDeviceActivityByUuidSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => UpdateDeviceActivityByUuidSchema.parse({})).toThrow();
  })
})
