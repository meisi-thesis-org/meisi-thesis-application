import { UserDTO } from '../../../../../src/gateways/user/domain/user.dto';
import crypto from 'crypto';

describe('UserDTO', () => {
  const uuid = crypto.randomUUID();
  const username = 'dummyUsername';
  const email = 'dummyEmail';
  const phoneNumber = 'dummyPhoneNumber';
  const firstName = 'dummyFirstName';
  const lastName = 'dummyLastName';
  const dateBirth = new Date();
  const accessToken = 'dummyAccessToken';
  const refreshToken = 'dummyRefreshCode';
  const blocked = false;
  const deactivated = false;
  const acceptedPrivacyTerms = false;
  const createdAt = new Date();
  const updatedAt = new Date();

  const userDTO: UserDTO = new UserDTO(
    uuid,
    username,
    email,
    phoneNumber,
    firstName,
    lastName,
    dateBirth,
    accessToken,
    refreshToken,
    blocked,
    deactivated,
    acceptedPrivacyTerms,
    createdAt,
    updatedAt
  );

  it('should have user containing uuid', () => {
    expect(userDTO.uuid).toEqual(uuid);
  })
  it('should have user containing username', () => {
    expect(userDTO.username).toEqual(username);
  })
  it('should have user containing email', () => {
    expect(userDTO.email).toEqual(email);
  })
  it('should have user containing phoneNumber', () => {
    expect(userDTO.phoneNumber).toEqual(phoneNumber);
  })
  it('should have user containing firstName', () => {
    expect(userDTO.firstName).toEqual(firstName);
  })
  it('should have user containing lastName', () => {
    expect(userDTO.lastName).toEqual(lastName);
  })
  it('should have user containing dateBirth', () => {
    expect(userDTO.dateBirth).toEqual(dateBirth);
  })
  it('should have user containing accessToken', () => {
    expect(userDTO.accessToken).toEqual(accessToken);
  })
  it('should have user containing refreshToken', () => {
    expect(userDTO.refreshToken).toEqual(refreshToken);
  })
  it('should have user containing blocked', () => {
    expect(userDTO.blocked).toEqual(blocked);
  })
  it('should have user containing deactivated', () => {
    expect(userDTO.deactivated).toEqual(deactivated);
  })
  it('should have user containing acceptedPrivacyTerms', () => {
    expect(userDTO.acceptedPrivacyTerms).toEqual(acceptedPrivacyTerms);
  })
  it('should have user containing createdAt', () => {
    expect(userDTO.createdAt).toEqual(createdAt);
  })
  it('should have user containing updatedAt', () => {
    expect(userDTO.updatedAt).toEqual(updatedAt);
  })
})
