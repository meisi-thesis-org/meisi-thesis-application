import { describe, expect, it } from 'vitest'
import { UserEntity } from './user.entity'
import { randomUUID } from 'crypto';
import { UserDTO } from './user.dto';

describe('UserEntity', () => {
  const dummyUuid = randomUUID();
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = 'dummyDateBirth';
  const dummyCreatedAt = new Date();
  const dummyUpdatedAt = dummyCreatedAt;

  const instance = new UserDTO(
    dummyUuid,
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have instanceOf UserDTO', () => {
    expect(instance).instanceOf(UserDTO);
  })

  describe('uuid', () => {
    it(`should be equal to ${dummyUuid}`, () => {
      expect(instance.getUuid()).toEqual(dummyUuid);
    })
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
    it(`should be equal to ${dummyCreatedAt}`, () => {
      expect(instance.getCreatedAt()).toEqual(dummyCreatedAt);
    })
  })
  describe('updatedAt', () => {
    it(`should be equal to ${dummyUpdatedAt}`, () => {
      expect(instance.getUpdatedAt()).toEqual(dummyUpdatedAt);
    })
  })
})
