import { SecurityGatewayCollection } from '../../../../src/shared/collections/security-gateway.collection';

describe('SecurityGatewayCollection', () => {
  it('should have users route', () => {
    expect(SecurityGatewayCollection.USERS).toBe('/users');
  })
})
