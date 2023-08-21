import { describe, it, expect } from 'vitest';
import { RandomProvider } from '../../../../../shared/src/providers/random.provider';
import { UserDTO } from './user.domain';

describe('UserDTO', () => {
  const dummyUuid = new RandomProvider().randomUUID();
  const dummyEmail = 'dummyEmail';
  const dummyUsername = 'dummyUsername';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = new Date().toISOString();
  const dummyCreatedAt = new Date().toISOString();
  const dummyUpdatedAt = new Date().toISOString();

  const instance = new UserDTO(
    dummyUuid,
    dummyEmail,
    dummyUsername,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have an instanceOf UserDTO', () => {
    expect(instance).instanceOf(UserDTO);
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

  it('should have dummyFirstName as firstName', () => {
    expect(instance.getFirstName()).toBe(dummyFirstName);
  })

  it('should have dummyLastName as lastName', () => {
    expect(instance.getLastName()).toBe(dummyLastName);
  })

  it('should have dummyDateBirth as dateBirth', () => {
    expect(instance.getDateBirth()).toBe(dummyDateBirth);
  })

  it('should have dummyCreatedAt as createdAt', () => {
    expect(instance.getCreatedAt()).toBe(dummyCreatedAt);
  })

  it('should have dummyUpdatedAt as updatedAt', () => {
    expect(instance.getUpdatedAt()).toBe(dummyUpdatedAt);
  })
})
