import { describe, it, expect } from 'vitest';
import { SignUpRequest } from './sign-up.request';

describe('SignUpRequest', () => {
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';

  const signUpRequest = new SignUpRequest(
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber
  );

  it(`should have username toEqual ${dummyUsername}`, () => {
    expect(signUpRequest.getUsername()).toEqual(dummyUsername)
  })

  it(`should have email toEqual ${dummyEmail}`, () => {
    expect(signUpRequest.getEmail()).toEqual(dummyEmail)
  })

  it(`should have phoneNumber toEqual ${dummyPhoneNumber}`, () => {
    expect(signUpRequest.getPhoneNumber()).toEqual(dummyPhoneNumber)
  })
})
