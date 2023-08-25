import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { SignOutSchema } from './sign-out.schema';

describe('SignOutSchema', () => {
  const signOutProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    }
  }

  it('should equal the signOutProps as the schema is correct', () => {
    expect(SignOutSchema.parse(signOutProps)).toEqual(signOutProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => SignOutSchema.parse({})).toThrow();
  })
})
