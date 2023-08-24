import { describe, it, expect } from 'vitest';
import { RefreshAccessCodeSchema } from './refresh-access-code.schema';

describe('RefreshAccessCodeSchema', () => {
  const refreshAccessCodeProps = {
    body: {
      username: 'dummyUsername',
      email: 'dummyEmail',
      phoneNumber: 'dummyPhoneNumber'
    }
  }

  it('should equal the refreshAccessCodeProps as the schema is correct', () => {
    expect(RefreshAccessCodeSchema.parse(refreshAccessCodeProps)).toEqual(refreshAccessCodeProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => RefreshAccessCodeSchema.parse({})).toThrow();
  })
})
