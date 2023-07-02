import { HttpCodeCollection } from '../../../../src/shared/collections/http-code.collection'

describe('HttpCodeCollection', () => {
  it('should have 200 status', () => {
    expect(HttpCodeCollection.OK).toBe(200);
  })
  it('should have 201 status', () => {
    expect(HttpCodeCollection.CREATED).toBe(201);
  })
  it('should have 400 status', () => {
    expect(HttpCodeCollection.BAD_REQUEST).toBe(400);
  })
  it('should have 401 status', () => {
    expect(HttpCodeCollection.UNAUTHORIZED).toBe(401);
  })
  it('should have 404 status', () => {
    expect(HttpCodeCollection.NON_FOUND).toBe(404);
  })
  it('should have 409 status', () => {
    expect(HttpCodeCollection.CONFLICT).toBe(409);
  })
  it('should have 500 status', () => {
    expect(HttpCodeCollection.INTERNAL_SERVER_ERROR).toBe(500);
  })
})
