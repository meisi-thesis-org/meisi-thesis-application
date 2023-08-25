import { describe, expect, it } from 'vitest';
import { ConnectionService } from './connection.service';

describe('ConnectionService', () => {
  const instance = new ConnectionService();

  it('should have an instanceOf ConnectionService', () => {
    expect(instance).toBeInstanceOf(ConnectionService);
  })
});
