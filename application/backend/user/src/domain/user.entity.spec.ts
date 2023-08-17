import { describe, expect, it } from 'vitest'
import { UserEntity } from './user.entity'

describe('UserEntity', () => {
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyAccessCode = 'dummyAccessCode';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = 'dummyDateBirth';

  const instance = new UserEntity(
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber,
    dummyAccessCode,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth
  );

  it('should have instanceOf UserEntity', () => {
    expect(instance).instanceOf(UserEntity);
  })

  describe('username', () => {
    it(`should be equal to ${dummyUsername}`, () => {
      expect(instance.getUsername()).toEqual(dummyUsername);
    })
  })
  describe('email', () => {
    it(`should be equal to ${dummyEmail}`, () => {
      expect(instance.getEmail()).toEqual(dummyEmail);
    })
  })
  describe('phoneNumber', () => {
    it(`should be equal to ${dummyPhoneNumber}`, () => {
      expect(instance.getPhoneNumber()).toEqual(dummyPhoneNumber);
    })
  })
  describe('accessCode', () => {
    it(`should be equal to ${dummyAccessCode}`, () => {
      expect(instance.getAccessCode()).toEqual(dummyAccessCode);
    })
  })
  describe('firstName', () => {
    it(`should be equal to ${dummyFirstName}`, () => {
      expect(instance.getFirstName()).toEqual(dummyFirstName);
    })
  })
  describe('lastName', () => {
    it(`should be equal to ${dummyLastName}`, () => {
      expect(instance.getLastName()).toEqual(dummyLastName);
    })
  })
  describe('dateBirth', () => {
    it(`should be equal to ${dummyDateBirth}`, () => {
      expect(instance.getDateBirth()).toEqual(dummyDateBirth);
    })
  })
  describe('createdAt', () => {
    it('should be instanceOf Date', () => {
      expect(instance.getCreatedAt()).instanceOf(Date);
    })
  })
  describe('updatedAt', () => {
    it('should be instanceOf Date', () => {
      expect(instance.getUpdatedAt()).instanceOf(Date);
    })
  })
})
