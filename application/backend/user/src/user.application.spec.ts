import { UserApplication } from './user.application'
import { it, describe, expect } from 'vitest';

describe('UserApplication', () => {
  const application = new UserApplication();

  it('should have instanceOf UserApplication', () => {
    expect(application).instanceOf(UserApplication)
  })
})
