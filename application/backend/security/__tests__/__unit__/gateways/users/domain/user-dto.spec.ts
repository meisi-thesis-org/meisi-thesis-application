import { UserDTO } from '../../../../../src/gateways/users/domain/user.dto'

describe('UserDTO', () => {
  const dummyUuid = 'dummyUuid';
  const dummyUsername = 'dummyUsername';
  const dummyEmail = 'dummyEmail';
  const dummyPhoneNumber = 'dummyPhoneNumber';
  const dummyFirstName = 'dummyFirstName';
  const dummyLastName = 'dummyLastName';
  const dummyDateBirth = new Date();
  const dummyAccessToken = 'dummyAccessToken';
  const dummyRefreshToken = 'dummyRefreshToken';
  const dummyBlocked = false;
  const dummyDeactivated = false;
  const dummyAcceptedPrivacyTerms = false;
  const dummyCreatedAt = new Date();
  const dummyUpdatedAt = new Date();

  const instance = new UserDTO(
    dummyUuid,
    dummyUsername,
    dummyEmail,
    dummyPhoneNumber,
    dummyFirstName,
    dummyLastName,
    dummyDateBirth,
    dummyAccessToken,
    dummyRefreshToken,
    dummyBlocked,
    dummyDeactivated,
    dummyAcceptedPrivacyTerms,
    dummyCreatedAt,
    dummyUpdatedAt
  );

  it('should have uuid be defined', () => {
    expect(instance.getUuid()).toBe(dummyUuid);
  })

  it('should have username be defined', () => {
    expect(instance.getUsername()).toBe(dummyUsername);
  })

  it('should have email be defined', () => {
    expect(instance.getEmail()).toBe(dummyEmail);
  })

  it('should have phoneNumber be defined', () => {
    expect(instance.getPhoneNumber()).toBe(dummyPhoneNumber);
  })

  it('should have firstName be defined', () => {
    expect(instance.getFirstName()).toBe(dummyFirstName);
  })

  it('should have lastName be defined', () => {
    expect(instance.getLastName()).toBe(dummyLastName);
  })

  it('should have dateBirth be defined', () => {
    expect(instance.getDateBirth()).toBe(dummyDateBirth);
  })

  it('should have accessToken be dummyAccessToken', () => {
    expect(instance.getAccessToken()).toBe(dummyAccessToken);
  })

  it('should have refreshToken be dummyRefreshToken', () => {
    expect(instance.getRefreshToken()).toBe(dummyRefreshToken);
  })

  it('should have blocked be dummyBlocked', () => {
    expect(instance.getBlocked()).toBe(dummyBlocked);
  })

  it('should have deactivated be dummyDeactivated', () => {
    expect(instance.getDeactivated()).toBe(dummyDeactivated);
  })

  it('should have acceptPrivacyTerms be dummyAcceptedPrivacyTerms', () => {
    expect(instance.getAcceptedPrivacyTerms()).toBe(dummyAcceptedPrivacyTerms);
  })

  it('should have createdAt be defined', () => {
    expect(instance.getCreatedAt()).toBe(dummyCreatedAt);
  })

  it('should have updatedAt be defined', () => {
    expect(instance.getUpdatedAt()).toBe(dummyUpdatedAt);
  })
})
