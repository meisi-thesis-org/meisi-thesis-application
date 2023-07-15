import { UserEntity } from '../../../../../src/gateways/users/domain/user.entity'

describe('UserEntity', () => {
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = new Date();
  const dummyAccessCode = 'dummyAccessCode';

  const entity = new UserEntity(
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyAccessCode
  );

  it('should have username be defined', () => {
    expect(entity.getUsername()).toBe(dummyUsername);
  })

  it('should have email be defined', () => {
    expect(entity.getEmail()).toBe(dummyEmail);
  })

  it('should have phoneNumber be defined', () => {
    expect(entity.getPhoneNumber()).toBe(dummyPhoneNumber);
  })

  it('should have firstName be defined', () => {
    expect(entity.getFirstName()).toBe(dummyFirstName);
  })

  it('should have lastName be defined', () => {
    expect(entity.getLastName()).toBe(dummyLastName);
  })

  it('should have dateBirth be defined', () => {
    expect(entity.getDateBirth()).toBe(dummyDateBirth);
  })

  it('should have accessCode be defined', () => {
    expect(entity.getAccessCode()).toBe(dummyAccessCode);
  })

  it('should have accessToken be null', () => {
    expect(entity.getAccessToken()).toBe(null);
  })

  it('should have refreshToken be null', () => {
    expect(entity.getRefreshToken()).toBe(null);
  })

  it('should have blocked be false', () => {
    expect(entity.getBlocked()).toBe(false);
  })

  it('should have deactivate be false', () => {
    expect(entity.getDeactivated()).toBe(false);
  })

  it('should have acceptPrivacyTerms be false', () => {
    expect(entity.getAcceptedPrivacyTerms()).toBe(false);
  })
})
