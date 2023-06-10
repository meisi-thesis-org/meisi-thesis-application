import { UuidProvider } from '../../../src/providers/uuid.provider'

describe('UuidProvider', () => {
  const uuidProvider = new UuidProvider();

  it('should have uuid generated', () => {
    expect(uuidProvider.randomUuid()).toBeDefined();
  })
})
