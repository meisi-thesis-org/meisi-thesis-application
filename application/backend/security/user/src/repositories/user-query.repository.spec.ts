import { describe, expect, it } from 'vitest';
import { UserQueryRepository } from './user-query.repository';

describe('UserQueryRepository', () => {
  const instance = new UserQueryRepository();

  it('should have an instanceOf UserQueryRepository', () => {
    expect(instance).toBeInstanceOf(UserQueryRepository);
  })
})
