import { describe, it, expect } from 'vitest';
import { UserEntity } from './user.entity';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';

describe('UserEntity', () => {
  const dummyUuid = new RandomProvider().randomUUID();
  const dummyEmail = 'dummyEmail';
  const dummyUsername = 'dummyUsername';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyAccessCode = 'dummyAccessCode';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = new Date().toISOString();
  const dummyAccessToken = 'dummyAccessToken';
  const dummyRefreshToken = 'dummyRefreshToken';
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new UserEntity(
    dummyUuid,
    dummyEmail,
    dummyUsername,
    dummyPhoneNumber,
    dummyAccessCode,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyAccessToken,
    dummyRefreshToken,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have an instanceOf UserEntity', () => {
    expect(instance).instanceOf(UserEntity);
  })

  it('should have dummyUuid as uuid', () => {
    expect(instance.getUuid()).toBe(dummyUuid);
  })

  it('should have dummyEmail as email', () => {
    expect(instance.getEmail()).toBe(dummyEmail);
  })

  it('should have dummyUsername as username', () => {
    expect(instance.getUsername()).toBe(dummyUsername);
  })

  it('should have dummyPhoneNumber as phoneNumber', () => {
    expect(instance.getPhoneNumber()).toBe(dummyPhoneNumber);
  })

  it('should have dummyAccessCode as accessCode', () => {
    expect(instance.getAccessCode()).toBe(dummyAccessCode);
  })

  it('should have dummyFirstName as firstName', () => {
    expect(instance.getFirstName()).toBe(dummyFirstName);
  })

  it('should have dummyLastName as lastName', () => {
    expect(instance.getLastName()).toBe(dummyLastName);
  })

  it('should have dummyDateBirth as dateBirth', () => {
    expect(instance.getDateBirth()).toBe(dummyDateBirth);
  })

  it('should have dummyAccessToken as accessToken', () => {
    expect(instance.getAccessToken()).toBe(dummyAccessToken);
  })

  it('should have dummyRefreshToken as accessToken', () => {
    expect(instance.getRefreshToken()).toBe(dummyRefreshToken);
  })

  it('should have dummyCreatedAt as createdAt', () => {
    expect(instance.getCreatedAt()).toBe(dummyCreatedAt);
  })

  it('should have dummyUpdatedAt as updatedAt', () => {
    expect(instance.getUpdatedAt()).toBe(dummyUpdatedAt);
  })
})
