import { describe, expect, it } from 'vitest';
import { DossierEntity } from './dossier.entity';

describe('DossierEntity', () => {
  const instance = new DossierEntity(
    'dummyUuid',
    'dummyUserUuid',
    'dummyDescription',
    new Date().toISOString(),
    new Date().toISOString()
  );

  it('should have an instanceOf DossierEntity', () => {
    expect(instance).toBeInstanceOf(DossierEntity)
  })
})
