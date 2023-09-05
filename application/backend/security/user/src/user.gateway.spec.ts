import { describe, expect, it } from 'vitest';
import { UserGateway } from './user.gateway';

describe('UserGateway', () => {
  const instance = new UserGateway();

  it('should have an instanceOf UserGateway', () => {
    expect(instance).toBeInstanceOf(UserGateway)
  })
})
