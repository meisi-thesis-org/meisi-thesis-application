import { describe, expect, it } from 'vitest';
import { UserController } from './user.controller';

describe('UserController', () => {
  const instance = new UserController();

  it('should have an instanceOf UserController', () => {
    expect(instance).instanceOf(UserController);
  })
})
