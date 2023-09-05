import { describe, it, expect } from 'vitest';
import { DossierApplication } from './dossier.application';

describe('DossierApplication', () => {
  const instance = new DossierApplication();

  it('should have an instanceOf DossierApplication', () => {
    expect(instance).toBeInstanceOf(DossierApplication);
  })
})
