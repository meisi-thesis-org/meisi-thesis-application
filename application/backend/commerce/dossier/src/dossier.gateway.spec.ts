import { describe, expect, it } from 'vitest';
import { DossierGateway } from './dossier.gateway';

describe('DossierGateway', () => {
  const instance = new DossierGateway();

  it('should have an instanceOf DossierGateway', () => {
    expect(instance).toBeInstanceOf(DossierGateway)
  })
})
