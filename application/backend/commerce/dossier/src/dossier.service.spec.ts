import { describe, expect, it } from 'vitest';
import { DossierService } from './dossier.service';

describe('DossierService', () => {
  const instance = new DossierService();

  it('should have an instanceOf DossierService', () => {
    expect(instance).toBeInstanceOf(DossierService)
  })
})
