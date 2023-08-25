import { describe, it, expect } from 'vitest';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { RefreshTokensSchema } from './refresh-tokens.schema';

describe('RefreshTokensSchema', () => {
  const refreshTokensSchema = {
    params: {
      uuid: new RandomProvider().randomUUID()
    }
  }

  it('should equal the refreshTokensSchema as the schema is correct', () => {
    expect(RefreshTokensSchema.parse(refreshTokensSchema)).toEqual(refreshTokensSchema);
  })

  it('should have an error because incorrect given structure', () => {
    expect(() => RefreshTokensSchema.parse({})).toThrow();
  })
})
