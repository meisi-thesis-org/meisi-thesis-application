import { describe, it, expect } from 'vitest';
import { UserApplication } from './user.application';

describe('UserApplication', () => {
  const instance = new UserApplication();

  it('should have an instanceOf UserApplication', () => {
    expect(instance).toBeInstanceOf(UserApplication);
  })
})
