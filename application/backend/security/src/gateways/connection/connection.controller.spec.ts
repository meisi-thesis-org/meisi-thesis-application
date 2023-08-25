import { describe, expect, it } from 'vitest';
import { ConnectionController } from './connection.controller';

describe('ConnectionController', () => {
  const instance = new ConnectionController();

  it('should have an instanceOf ConnectionController', () => {
    expect(instance).instanceOf(ConnectionController);
  })

  describe('refreshTokens', () => {})
})
