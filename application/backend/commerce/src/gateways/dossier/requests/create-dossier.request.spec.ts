import { describe, expect, it } from 'vitest';
import { CreateDossierRequest } from './create-dossier.request';

describe('CreateDossierRequest', () => {
  const instance = new CreateDossierRequest(
    'dummyUserUuid',
    'dummyDescription'
  );

  it('should have an instanceOf CreateDossierRequest', () => {
    expect(instance).toBeInstanceOf(CreateDossierRequest)
  })
})
