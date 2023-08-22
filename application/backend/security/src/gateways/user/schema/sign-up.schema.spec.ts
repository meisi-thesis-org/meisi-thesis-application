import { describe, it, expect } from 'vitest';
import { SignUpSchema } from './sign-up.schema';

describe('SignUpSchema', () => {
  const signUpProps = {
    body: {
      username: 'dummyUsername',
      email: 'dummyEmail@dummyEmail.com',
      phoneNumber: 'dummyPhoneNumber'

    }
  }

  it('should equal the signUpProps as the schema is correct', () => {
    expect(SignUpSchema.parse(signUpProps)).toEqual(signUpProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => SignUpSchema.parse({})).toThrow();
  })
})
