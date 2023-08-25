import { describe, expect, it } from 'vitest';
import { RefreshTokensRequest } from './refresh-tokens.request';

describe('RefreshTokensRequest', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUserUuid = 'dummyUserUuid';
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';

  const instance = new RefreshTokensRequest(
    dummyUuid,
    dummyUserUuid,
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber
  );

  it('should have an instanceOf RefreshTokensRequest', () => {
    expect(instance).toBeInstanceOf(RefreshTokensRequest);
  })

  describe('getUuid', () => {
    it('should return dummyUuid', () => {
      expect(instance.getUuid()).toEqual(dummyUuid)
    })
  })

  describe('getUserUuid', () => {
    it('should return dummyUserUuid', () => {
      expect(instance.getUserUuid()).toEqual(dummyUserUuid)
    })
  })

  describe('getUsername', () => {
    it('should return dummyUsername', () => {
      expect(instance.getUsername()).toEqual(dummyUsername)
    })
  })

  describe('getEmail', () => {
    it('should return dummyEmail', () => {
      expect(instance.getEmail()).toEqual(dummyEmail)
    })
  })

  describe('getPhoneNumber', () => {
    it('should return dummyPhoneNumber', () => {
      expect(instance.getPhoneNumber()).toEqual(dummyPhoneNumber)
    })
  })
})
