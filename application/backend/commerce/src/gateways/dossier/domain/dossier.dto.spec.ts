import { describe, expect, it } from 'vitest';
import { DossierDTO } from './dossier.dto';

describe('DossierDTO', () => {
  const instance = new DossierDTO(
    'dummyUuid',
    'dummyUserUuid',
    'dummyDescription',
    new Date().toISOString(),
    new Date().toISOString()
  );

  it('should have an instanceOf DossierDTO', () => {
    expect(instance).toBeInstanceOf(DossierDTO)
  })
})
