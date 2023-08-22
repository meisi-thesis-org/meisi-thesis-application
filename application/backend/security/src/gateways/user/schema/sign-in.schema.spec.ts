import { describe, it, expect } from 'vitest';
import { SignInSchema } from './sign-in.schema';

describe('SignInSchema', () => {
  const signInProps = {
    body: {
      accessCode: 'dummyAccessCode'
    }
  }

  it('should equal the signInProps as the schema is correct', () => {
    expect(SignInSchema.parse(signInProps)).toEqual(signInProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => SignInSchema.parse({})).toThrow();
  })
})
