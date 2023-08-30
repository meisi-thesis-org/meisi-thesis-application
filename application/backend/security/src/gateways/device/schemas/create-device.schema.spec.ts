import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { CreateDeviceSchema } from './create-device.schema';

describe('CreateDeviceSchema', () => {
  const createDeviceSchemaProps = {
    body: {
      userUuid: new RandomProvider().randomUUID(),
      ipAddress: 'dummyIpAddress',
      platform: 'dummyPlatform',
      model: 'dummyModel'
    }
  }

  it('should equal the createDeviceSchema as the schema is correct', () => {
    expect(CreateDeviceSchema.parse(createDeviceSchemaProps)).toEqual(createDeviceSchemaProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => CreateDeviceSchema.parse({})).toThrow();
  })
})
