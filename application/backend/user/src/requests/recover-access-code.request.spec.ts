import { describe, it, expect } from 'vitest';
import { RecoverAccessCodeRequest } from './recover-access-code.request';

describe('RecoverAccessCodeRequest', () => {
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';

  const recoverAccessCodeRequest = new RecoverAccessCodeRequest(
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber
  );

  it(`should have username toEqual ${dummyUsername}`, () => {
    expect(recoverAccessCodeRequest.getUsername()).toEqual(dummyUsername)
  })

  it(`should have email toEqual ${dummyEmail}`, () => {
    expect(recoverAccessCodeRequest.getEmail()).toEqual(dummyEmail)
  })

  it(`should have phoneNumber toEqual ${dummyPhoneNumber}`, () => {
    expect(recoverAccessCodeRequest.getPhoneNumber()).toEqual(dummyPhoneNumber)
  })
})
