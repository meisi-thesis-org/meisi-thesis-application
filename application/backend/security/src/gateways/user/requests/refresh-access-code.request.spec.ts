import { describe, expect, it } from 'vitest';
import { RefreshAccessCodeRequest } from './refresh-access-code.request';

describe('RefreshAccessCodeRequest', () => {
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';

  const instance = new RefreshAccessCodeRequest(
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber
  )

  it('should have an instanceOf RefreshAccessCodeRequest', () => {
    expect(instance).toBeInstanceOf(RefreshAccessCodeRequest);
  })

  it('should have an username toEqual dummyUsername', () => {
    expect(instance.getUsername()).toEqual(dummyUsername);
  })

  it('should have an email toEqual dummyEmail', () => {
    expect(instance.getEmail()).toEqual(dummyEmail);
  })

  it('should have an phoneNumber toEqual dummyPhoneNumber', () => {
    expect(instance.getPhoneNumber()).toEqual(dummyPhoneNumber);
  })
})
