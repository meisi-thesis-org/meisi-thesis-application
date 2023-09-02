import { describe, expect, it } from 'vitest';
import { DossierMapper } from './dossier.mapper';
import { DossierDTO } from './dossier.dto';
import { DossierEntity } from './dossier.entity';

describe('DossierMapper', () => {
  const instance = new DossierMapper();

  it('should have an instanceOf DossierMapper', () => {
    expect(instance).instanceOf(DossierMapper);
  })

  describe('map', () => {
    it('should have an DossierDTO from an DossierEntity', () => {
      const dossierEntity = new DossierEntity(
        'dummyUuid',
        'dummyUserUuid',
        'dummyDescription',
        new Date().toISOString(),
        new Date().toISOString()
      );

      expect(instance.map(dossierEntity)).toBeInstanceOf(DossierDTO)
    })
  })
})
