import { describe, expect, it } from 'vitest';
import { SignUpRequest } from './sign-up.request';

describe('SignUpRequest', () => {
  const dummyUsername: string = 'dummyUsername';
  const dummyEmail: string = 'dummyEmail';
  const dummyPhoneNumber: string = 'dummyPhoneNumber';

  const instance = new SignUpRequest(dummyUsername, dummyEmail, dummyPhoneNumber);

  it('should have an instanceOf SignUpRequest', () => {
    expect(instance).toBeInstanceOf(SignUpRequest);
  })

  it('should have an username to be dummyUsername', () => {
    expect(instance.getUsername()).toBe(dummyUsername);
  })

  it('should have an email to be dummyEmail', () => {
    expect(instance.getEmail()).toBe(dummyEmail);
  })

  it('should have an phoneNumber to be dummyPhoneNumber', () => {
    expect(instance.getPhoneNumber()).toBe(dummyPhoneNumber);
  })
})
