import { describe, it, expect } from 'vitest';
import { WalletApplication } from './wallet.application';

describe('WalletApplication', () => {
  const instance = new WalletApplication();

  it('should have an instanceOf WalletApplication', () => {
    expect(instance).toBeInstanceOf(WalletApplication);
  })
})
