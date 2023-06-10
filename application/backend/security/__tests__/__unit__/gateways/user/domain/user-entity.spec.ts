import { UserEntity } from '../../../../../src/gateways/user/domain/user.entity'
import crypto from 'crypto';

describe('UserEntity', () => {
  const uuid = crypto.randomUUID();
  const username = 'dummyUsername';
  const email = 'dummyEmail';
  const phoneNumber = 'dummyPhoneNumber';
  const firstName = 'dummyFirstName';
  const lastName = 'dummyLastName';
  const dateBirth = new Date();
  const accessCode = 'dummyAccessCode';
  const accessToken = 'dummyAccessToken';
  const refreshToken = 'dummyRefreshCode';
  const blocked = false;
  const deactivated = false;
  const acceptedPrivacyTerms = false;

  const userEntity: UserEntity = new UserEntity(
    uuid,
    username,
    email,
    phoneNumber,
    firstName,
    lastName,
    dateBirth,
    accessCode,
    accessToken,
    refreshToken,
    blocked,
    deactivated,
    acceptedPrivacyTerms
  );

  it('should have user containing uuid', () => {
    expect(userEntity.uuid).toEqual(uuid);
  })
  it('should have user containing username', () => {
    expect(userEntity.username).toEqual(username);
  })
  it('should have user containing email', () => {
    expect(userEntity.email).toEqual(email);
  })
  it('should have user containing phoneNumber', () => {
    expect(userEntity.phoneNumber).toEqual(phoneNumber);
  })
  it('should have user containing firstName', () => {
    expect(userEntity.firstName).toEqual(firstName);
  })
  it('should have user containing lastName', () => {
    expect(userEntity.lastName).toEqual(lastName);
  })
  it('should have user containing dateBirth', () => {
    expect(userEntity.dateBirth).toEqual(dateBirth);
  })
  it('should have user containing accessCode', () => {
    expect(userEntity.accessCode).toEqual(accessCode);
  })
  it('should have user containing accessToken', () => {
    expect(userEntity.accessToken).toEqual(accessToken);
  })
  it('should have user containing refreshToken', () => {
    expect(userEntity.refreshToken).toEqual(refreshToken);
  })
  it('should have user containing blocked', () => {
    expect(userEntity.blocked).toEqual(blocked);
  })
  it('should have user containing deactivated', () => {
    expect(userEntity.deactivated).toEqual(deactivated);
  })
  it('should have user containing acceptedPrivacyTerms', () => {
    expect(userEntity.acceptedPrivacyTerms).toEqual(acceptedPrivacyTerms);
  })
  it('should have user containing createdAt', () => {
    expect(userEntity.createdAt).toBeTruthy();
  })
  it('should have user containing updatedAt', () => {
    expect(userEntity.updatedAt).toBeTruthy();
  })
})
