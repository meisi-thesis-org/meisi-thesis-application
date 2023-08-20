import { describe, expect, it } from 'vitest';
import { UserService } from './user.service';

describe('UserService', () => {
  const instance = new UserService();

  it('should have an instanceOf UserService', () => {
    expect(instance).instanceOf(UserService);
  })
})
