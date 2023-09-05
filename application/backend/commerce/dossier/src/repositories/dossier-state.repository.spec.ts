import { describe, it, expect } from 'vitest';
import { DossierStateRepository } from './dossier-state.repository';

describe('DossierStateRepository', () => {
  const instance = new DossierStateRepository();

  it('should have an instanceOf DossierStateRepository', () => {
    expect(instance).toBeInstanceOf(DossierStateRepository)
  })
})
