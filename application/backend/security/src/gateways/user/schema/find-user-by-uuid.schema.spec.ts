import { describe, it, expect } from 'vitest';
import { findUserByUuidSchema } from './find-user-by-uuid.schema';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

describe('FindUserByUuidSchema', () => {
  const findUserByUuidProps = {
    params: {
      uuid: new RandomProvider().randomUUID()
    }
  }

  it('should equal the findUserByUuidProps as the schema is correct', () => {
    expect(findUserByUuidSchema.parse(findUserByUuidProps)).toEqual(findUserByUuidProps);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => findUserByUuidSchema.parse({})).toThrow();
  })
})
