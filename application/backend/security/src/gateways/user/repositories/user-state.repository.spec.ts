import { describe, it, expect } from 'vitest';
import { UserStateRepository } from './user-state.repository';

describe('UserStateRepository', () => {
  const instance = new UserStateRepository();

  it('should have an instanceOf UserStateRepository', () => {
    expect(instance).toBeInstanceOf(UserStateRepository);
  })
})
