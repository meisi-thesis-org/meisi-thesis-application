import { describe, expect, it } from 'vitest';
import { WalletGateway } from './wallet.gateway';

describe('WalletGateway', () => {
  const instance = new WalletGateway();

  it('should have an instanceOf WalletGateway', () => {
    expect(instance).toBeInstanceOf(WalletGateway)
  })
})
